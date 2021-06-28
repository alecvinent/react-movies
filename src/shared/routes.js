const base_routes = {
  home: "/",
  movie: '/movies/:movieID',
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
  },
  error: {
    page404:'/not-found',
    page500:'/error',
  },
};
export default base_routes;
