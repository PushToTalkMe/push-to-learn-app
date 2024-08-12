import { NextRequest, NextResponse } from 'next/server';
import { SessionInfoDto } from './api/generated';
import axios from 'axios';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { ROUTES } from './constants/routes';

const TOKEN = 'access-token';
const ADMIN = 'admin';
const STUDENT = 'student';
const APP = '/app';
const AUTH = '/auth';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathForUser = APP;
  const pathForAdmin = ROUTES.DASHBOARD;

  const cookie = request.cookies.get(TOKEN) || '';
  const session = await getSessionRole(cookie);

  if (!session && !url.pathname.startsWith(AUTH)) {
    url.pathname = ROUTES.SIGN_IN;
    return Response.redirect(url);
  }

  if (
    session &&
    url.pathname.startsWith(pathForUser) &&
    session.role !== STUDENT &&
    session.role !== ADMIN
  ) {
    url.pathname = ROUTES.SIGN_IN;
    return Response.redirect(url);
  }

  if (
    session &&
    url.pathname.startsWith(pathForAdmin) &&
    session.role !== ADMIN
  ) {
    url.pathname = ROUTES.ALL_COURSES;
    return Response.redirect(url);
  }

  NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon|.*\\.png$).*)'],
};

async function getSessionRole(
  cookie: RequestCookie | '',
): Promise<SessionInfoDto | ''> {
  if (!cookie) {
    return '';
  }
  return axios
    .get('http://localhost:3000/auth/session', {
      headers: {
        'Content-Type': 'application/json',
        cookie: `${cookie.name}=${cookie.value}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return '';
    });
}
