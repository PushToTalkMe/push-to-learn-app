export const API = {
  courses: {
    findAll: process.env.NEXT_PUBLIC_DOMAIN + '/api/course/all',
    byIndex: process.env.NEXT_PUBLIC_DOMAIN + '/api/course/',
  },
  auth: {
    login: process.env.NEXT_PUBLIC_DOMAIN + '/api/login',
  },
};
