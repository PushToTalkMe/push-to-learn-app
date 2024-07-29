/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * server
 * OpenAPI spec version: 1.0.0
 */
import { createInstance } from './api-instance';
import type { BodyType } from './api-instance';
export interface GetCommentDto {
  createdAt: string;
  firstName: string;
  id: number;
  lastName: string;
  text: string;
}

export interface CreateCommentDto {
  lessonId: number;
  text: string;
}

export type LessonDtoType = (typeof LessonDtoType)[keyof typeof LessonDtoType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LessonDtoType = {
  Theory: 'Theory',
  Test: 'Test',
  Exercise: 'Exercise',
} as const;

export type LessonDtoData = TheoryDto | TestDto | ExerciseDto;

export interface LessonDto {
  createdAt: string;
  data: LessonDtoData;
  id: number;
  sectionId: number;
  sequence: number;
  title: string;
  type: LessonDtoType;
  updatedAt: string;
}

export type PatchLessonDtoData = TheoryDto | TestDto | ExerciseDto;

export interface PatchLessonDto {
  data: PatchLessonDtoData;
  sequence: number;
  title: string;
}

export type CreateLessonDtoType =
  (typeof CreateLessonDtoType)[keyof typeof CreateLessonDtoType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateLessonDtoType = {
  Theory: 'Theory',
  Test: 'Test',
  Exercise: 'Exercise',
} as const;

export type CreateLessonDtoData = { [key: string]: any };

export interface CreateLessonDto {
  data: CreateLessonDtoData;
  sectionId: number;
  title: string;
  type: CreateLessonDtoType;
}

export interface PatchSequence {
  id: number;
  sequence: number;
}

export interface PatchSequences {
  patch: PatchSequence[];
}

export interface SectionDto {
  courseId: number;
  createdAt: string;
  id: number;
  sequence: number;
  title: string;
  updatedAt: string;
}

export interface PatchSectionDto {
  sequence: number;
  title: string;
}

export interface CreateSectionDto {
  courseId: number;
  title: string;
}

export type LessonDtoWithViewedType =
  (typeof LessonDtoWithViewedType)[keyof typeof LessonDtoWithViewedType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LessonDtoWithViewedType = {
  Theory: 'Theory',
  Test: 'Test',
  Exercise: 'Exercise',
} as const;

export interface LessonDtoWithViewed {
  createdAt: string;
  data: LessonDtoWithViewedData;
  id: number;
  sectionId: number;
  sequence: number;
  title: string;
  type: LessonDtoWithViewedType;
  updatedAt: string;
  viewed: boolean;
}

export interface ExerciseDto {
  createdAt: string;
  id: number;
  lessonId: number;
  tasks: string;
  updatedAt: string;
}

export interface TestDto {
  createdAt: string;
  id: number;
  lessonId: number;
  questions: string;
  updatedAt: string;
}

export interface TheoryDto {
  content: string;
  createdAt: string;
  id: number;
  lessonId: number;
  updatedAt: string;
}

export type LessonDtoWithViewedData = TheoryDto | TestDto | ExerciseDto;

export type LessonsWithoutContentType =
  (typeof LessonsWithoutContentType)[keyof typeof LessonsWithoutContentType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LessonsWithoutContentType = {
  Theory: 'Theory',
  Test: 'Test',
  Exercise: 'Exercise',
} as const;

export interface LessonsWithoutContent {
  createdAt: string;
  id: number;
  sectionId: number;
  sequence: number;
  title: string;
  type: LessonsWithoutContentType;
  updatedAt: string;
}

export interface SectionWithLessons {
  courseId: number;
  createdAt: string;
  id: number;
  lessons: LessonsWithoutContent[];
  sequence: number;
  title: string;
  updatedAt: string;
}

export interface CourseWithSectionsForEdit {
  author: string;
  createdAt: string;
  duration: string;
  id: number;
  img: string;
  inDeveloping: boolean;
  price: number;
  sectionsWithLessons: SectionWithLessons[];
  tags: string[];
  title: string;
  updatedAt: string;
}

export type LessonStatType =
  (typeof LessonStatType)[keyof typeof LessonStatType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LessonStatType = {
  Theory: 'Theory',
  Test: 'Test',
  Exercise: 'Exercise',
} as const;

export interface LessonStat {
  id: number;
  sequence: number;
  title: string;
  type: LessonStatType;
  viewed: boolean;
}

export interface SectionsWithLessonsStatDto {
  courseId: number;
  createdAt: string;
  id: number;
  lessonsStat: LessonStat[];
  sequence: number;
  title: string;
  updatedAt: string;
}

export interface CourseDtoWithSections {
  author: string;
  createdAt: string;
  duration: string;
  historyLessonId: number;
  historySectionId: number;
  id: number;
  img: string;
  inDeveloping: boolean;
  lessonCompleted: number;
  lessonCount: number;
  price: number;
  sectionsWithLessonsStat: SectionsWithLessonsStatDto[];
  tags: string[];
  title: string;
  updatedAt: string;
}

export interface CourseDtoWithUserStat {
  author: string;
  createdAt: string;
  duration: string;
  historyLessonId: number;
  historySectionId: number;
  id: number;
  img: string;
  inDeveloping: boolean;
  lessonCompleted: number;
  lessonCount: number;
  price: number;
  tags: string[];
  title: string;
  updatedAt: string;
}

export interface CourseDtoWithLessonCount {
  author: string;
  createdAt: string;
  duration: string;
  id: number;
  img: string;
  inDeveloping: boolean;
  lessonCount: number;
  price: number;
  tags: string[];
  title: string;
  updatedAt: string;
}

export interface CourseDtoLastLessons {
  author: string;
  createdAt: string;
  duration: string;
  id: number;
  img: string;
  inDeveloping: boolean;
  lastLessonId: number;
  lastSectionId: number;
  price: number;
  tags: string[];
  title: string;
  updatedAt: string;
}

export interface PatchCourseImageDto {
  file: Blob;
}

export interface CourseDto {
  author: string;
  createdAt: string;
  duration: string;
  id: number;
  img: string;
  inDeveloping: boolean;
  price: number;
  tags: string[];
  title: string;
  updatedAt: string;
}

export interface PatchCourseDto {
  duration: string;
  price: number;
  tags: string[];
  title: string;
}

export interface CreateCourseDto {
  duration: string;
  price: number;
  tags: string[];
  title: string;
}

export interface PatchAvatarDto {
  file: Blob;
}

export interface PatchAccountDto {
  firstName: string;
  lastName: string;
  username: string;
}

export interface InfoAboutAllUsers {
  countCourses: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  userId: number;
}

export interface AccountDto {
  avatar: string;
  firstName: string;
  id: number;
  lastName: string;
  userId: number;
  username: string;
}

export interface SessionInfoDto {
  email: string;
  exp: number;
  iat: number;
  id: number;
  role: string;
}

export interface SignInBodyDto {
  email: string;
  password: string;
}

export interface PatchUpdateRoleDto {
  email: string;
  role: string;
}

export interface SignUpBodyDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export const authControllerSignUp = (
  signUpBodyDto: BodyType<SignUpBodyDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/auth/sign-up`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: signUpBodyDto,
    },
    options,
  );
};

export const authControllerUpdateRole = (
  patchUpdateRoleDto: BodyType<PatchUpdateRoleDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/auth/update`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: patchUpdateRoleDto,
    },
    options,
  );
};

export const authControllerDelete = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<string>(
    { url: `/auth/delete`, method: 'DELETE' },
    options,
  );
};

export const authControllerSignIn = (
  signInBodyDto: BodyType<SignInBodyDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/auth/sign-in`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: signInBodyDto,
    },
    options,
  );
};

export const authControllerSignOut = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    { url: `/auth/sign-out`, method: 'POST' },
    options,
  );
};

export const authControllerGetSessionInfo = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<SessionInfoDto>(
    { url: `/auth/session`, method: 'GET' },
    options,
  );
};

export const accountControllerGetAccount = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<AccountDto>(
    { url: `/account`, method: 'GET' },
    options,
  );
};

export const accountControllerPatchAccount = (
  patchAccountDto: BodyType<PatchAccountDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<AccountDto>(
    {
      url: `/account`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: patchAccountDto,
    },
    options,
  );
};

export const accountControllerGetInfoAboutAllUsers = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<InfoAboutAllUsers[]>(
    { url: `/account/info`, method: 'GET' },
    options,
  );
};

export const accountControllerGetAvatar = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    { url: `/account/download/*`, method: 'GET' },
    options,
  );
};

export const accountControllerPatchAvatar = (
  patchAvatarDto: BodyType<PatchAvatarDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  const formData = new FormData();
  formData.append('file', patchAvatarDto.file);

  return createInstance<AccountDto>(
    {
      url: `/account/avatar`,
      method: 'PATCH',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    },
    options,
  );
};

export const coursesControllerCreate = (
  createCourseDto: BodyType<CreateCourseDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/courses/create`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createCourseDto,
    },
    options,
  );
};

export const coursesControllerGetImage = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    { url: `/courses/download/*`, method: 'GET' },
    options,
  );
};

export const coursesControllerPatchCourse = (
  courseId: number,
  patchCourseDto: BodyType<PatchCourseDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<CourseDto>(
    {
      url: `/courses/update/${courseId}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: patchCourseDto,
    },
    options,
  );
};

export const coursesControllerPatchCourseImage = (
  courseId: number,
  patchCourseImageDto: BodyType<PatchCourseImageDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  const formData = new FormData();
  formData.append('file', patchCourseImageDto.file);

  return createInstance<CourseDto>(
    {
      url: `/courses/update/image/${courseId}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    },
    options,
  );
};

export const coursesControllerReleaseCourse = (
  courseId: number,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<CourseDto>(
    { url: `/courses/release/${courseId}`, method: 'PATCH' },
    options,
  );
};

export const coursesControllerGetAllCoursesForEdit = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<CourseDtoLastLessons[]>(
    { url: `/courses/all`, method: 'GET' },
    options,
  );
};

export const coursesControllerGetAllCourses = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<CourseDto[]>(
    { url: `/courses`, method: 'GET' },
    options,
  );
};

export const coursesControllerDelete = (
  courseId: number,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<CourseDto>(
    { url: `/courses/${courseId}`, method: 'DELETE' },
    options,
  );
};

export const coursesControllerGetNotMyCourseById = (
  courseId: number,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<CourseDtoWithLessonCount>(
    { url: `/courses/notMy/${courseId}`, method: 'GET' },
    options,
  );
};

export const coursesControllerGetMyCourses = (
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<CourseDtoWithUserStat[]>(
    { url: `/courses/my`, method: 'GET' },
    options,
  );
};

export const coursesControllerGetCourseById = (
  courseId: number,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<CourseDtoWithSections>(
    { url: `/courses/my/${courseId}`, method: 'GET' },
    options,
  );
};

export const coursesControllerGetCourseByIdForEdit = (
  courseId: number,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<CourseWithSectionsForEdit>(
    { url: `/courses/edit/${courseId}`, method: 'GET' },
    options,
  );
};

export const coursesControllerGetPageLesson = (
  courseId: number,
  sectionId: number,
  lessonId: number,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<LessonDtoWithViewed>(
    {
      url: `/courses/my/${courseId}/sections/${sectionId}/lessons/${lessonId}`,
      method: 'GET',
    },
    options,
  );
};

export const coursesControllerLessonViewed = (
  courseId: number,
  sectionId: number,
  lessonId: number,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<boolean>(
    {
      url: `/courses/my/${courseId}/sections/${sectionId}/lessons/${lessonId}/viewed`,
      method: 'PATCH',
    },
    options,
  );
};

export const sectionsControllerCreate = (
  createSectionDto: BodyType<CreateSectionDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<SectionDto>(
    {
      url: `/sections/create`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createSectionDto,
    },
    options,
  );
};

export const sectionsControllerPatchSection = (
  sectionId: number,
  patchSectionDto: BodyType<PatchSectionDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<SectionDto>(
    {
      url: `/sections/update/${sectionId}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: patchSectionDto,
    },
    options,
  );
};

export const sectionsControllerPatchSequences = (
  patchSequences: BodyType<PatchSequences>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/sections/update/sequences`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: patchSequences,
    },
    options,
  );
};

export const sectionsControllerDeleteSection = (
  sectionId: number,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    { url: `/sections/delete/${sectionId}`, method: 'DELETE' },
    options,
  );
};

export const lessonsControllerCreate = (
  createLessonDto: BodyType<CreateLessonDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/lessons/create`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createLessonDto,
    },
    options,
  );
};

export const lessonsControllerPatchCourse = (
  lessonId: number,
  patchLessonDto: BodyType<PatchLessonDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<LessonDto>(
    {
      url: `/lessons/update/${lessonId}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: patchLessonDto,
    },
    options,
  );
};

export const lessonsControllerDeletelesson = (
  lessonId: number,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    { url: `/lessons/delete/${lessonId}`, method: 'DELETE' },
    options,
  );
};

export const buyControllerBuyCourse = (
  courseId: number,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    { url: `/buy/${courseId}`, method: 'POST' },
    options,
  );
};

export const commentsControllerCreate = (
  createCommentDto: BodyType<CreateCommentDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<void>(
    {
      url: `/comments/create`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createCommentDto,
    },
    options,
  );
};

export const commentsControllerGetComments = (
  lessonId: number,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<GetCommentDto[]>(
    { url: `/comments/${lessonId}`, method: 'GET' },
    options,
  );
};

export type AuthControllerSignUpResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignUp>>
>;
export type AuthControllerUpdateRoleResult = NonNullable<
  Awaited<ReturnType<typeof authControllerUpdateRole>>
>;
export type AuthControllerDeleteResult = NonNullable<
  Awaited<ReturnType<typeof authControllerDelete>>
>;
export type AuthControllerSignInResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignIn>>
>;
export type AuthControllerSignOutResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignOut>>
>;
export type AuthControllerGetSessionInfoResult = NonNullable<
  Awaited<ReturnType<typeof authControllerGetSessionInfo>>
>;
export type AccountControllerGetAccountResult = NonNullable<
  Awaited<ReturnType<typeof accountControllerGetAccount>>
>;
export type AccountControllerPatchAccountResult = NonNullable<
  Awaited<ReturnType<typeof accountControllerPatchAccount>>
>;
export type AccountControllerGetInfoAboutAllUsersResult = NonNullable<
  Awaited<ReturnType<typeof accountControllerGetInfoAboutAllUsers>>
>;
export type AccountControllerGetAvatarResult = NonNullable<
  Awaited<ReturnType<typeof accountControllerGetAvatar>>
>;
export type AccountControllerPatchAvatarResult = NonNullable<
  Awaited<ReturnType<typeof accountControllerPatchAvatar>>
>;
export type CoursesControllerCreateResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerCreate>>
>;
export type CoursesControllerGetImageResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerGetImage>>
>;
export type CoursesControllerPatchCourseResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerPatchCourse>>
>;
export type CoursesControllerPatchCourseImageResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerPatchCourseImage>>
>;
export type CoursesControllerReleaseCourseResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerReleaseCourse>>
>;
export type CoursesControllerGetAllCoursesForEditResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerGetAllCoursesForEdit>>
>;
export type CoursesControllerGetAllCoursesResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerGetAllCourses>>
>;
export type CoursesControllerDeleteResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerDelete>>
>;
export type CoursesControllerGetNotMyCourseByIdResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerGetNotMyCourseById>>
>;
export type CoursesControllerGetMyCoursesResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerGetMyCourses>>
>;
export type CoursesControllerGetCourseByIdResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerGetCourseById>>
>;
export type CoursesControllerGetCourseByIdForEditResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerGetCourseByIdForEdit>>
>;
export type CoursesControllerGetPageLessonResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerGetPageLesson>>
>;
export type CoursesControllerLessonViewedResult = NonNullable<
  Awaited<ReturnType<typeof coursesControllerLessonViewed>>
>;
export type SectionsControllerCreateResult = NonNullable<
  Awaited<ReturnType<typeof sectionsControllerCreate>>
>;
export type SectionsControllerPatchSectionResult = NonNullable<
  Awaited<ReturnType<typeof sectionsControllerPatchSection>>
>;
export type SectionsControllerPatchSequencesResult = NonNullable<
  Awaited<ReturnType<typeof sectionsControllerPatchSequences>>
>;
export type SectionsControllerDeleteSectionResult = NonNullable<
  Awaited<ReturnType<typeof sectionsControllerDeleteSection>>
>;
export type LessonsControllerCreateResult = NonNullable<
  Awaited<ReturnType<typeof lessonsControllerCreate>>
>;
export type LessonsControllerPatchCourseResult = NonNullable<
  Awaited<ReturnType<typeof lessonsControllerPatchCourse>>
>;
export type LessonsControllerDeletelessonResult = NonNullable<
  Awaited<ReturnType<typeof lessonsControllerDeletelesson>>
>;
export type BuyControllerBuyCourseResult = NonNullable<
  Awaited<ReturnType<typeof buyControllerBuyCourse>>
>;
export type CommentsControllerCreateResult = NonNullable<
  Awaited<ReturnType<typeof commentsControllerCreate>>
>;
export type CommentsControllerGetCommentsResult = NonNullable<
  Awaited<ReturnType<typeof commentsControllerGetComments>>
>;
