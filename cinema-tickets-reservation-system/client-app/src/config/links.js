export const links = {
  MAIN_PAGE_PATH: '/films',
  SIGN_UP_PAGE: '/account/signup',
  SIGN_IN_PAGE: '/account/login',
  FILM_SEARCH_PAGE: '/films',
  FILM_PAGE: '/films/:id',
  SITES_SELECTION_PAGE: '/sites-selection/:id',
  ORDERS_PAGE: '/profile',
  CURRENT_ORDERS_PAGE: '/profile/current-orders',
  PREVIOUS_ORDERS_PAGE: '/profile/previous-orders',
  PROFILE_PAGE: '/profile/account-settings',
  ADMIN_HOME: '/admin',
  MANAGE_MOVIES: '/admin/films',
  MANAGE_CINEMAS: '/admin/cinemas',
  MANAGE_SESSIONS: '/admin/sessions',
  ADD_FILM: '/admin/films/create',
  UPDATE_FILM: '/admin/films/:id/update',
  ADD_SESSION: '/admin/sessions/create',
  UPDATE_SESSION: '/admin/sessions/:id/update',
};

export const linkGenerator = {
  getFilmPageLink: id => `/films/${id}`,
  getFilmLink: id => `/admin/films/${id}/update`,
  getSessionLink: id => `/admin/sessions/${id}/update`,
  getSessionPageLink: id => `/sites-selection/${id}`,
};
