export const API_KEY = 'b1fd920cf962b644b0a09f8e8a075dd2'
export const MOVIE_API_URL = 'https://api.themoviedb.org/3'
export const MOVIE_API_POPULAR_MOVIES = MOVIE_API_URL + '/movie/popular?api_key=' + API_KEY + '&page=1'
export const MOVIE_API_MOVIE_DETAILS = MOVIE_API_URL + '/movie/{movie_id}?api_key=' + API_KEY
export const MOVIE_API_MOVIE_REVIEWS = MOVIE_API_URL + '/movie/{movie_id}/reviews?api_key=' + API_KEY
export const MOVIE_API_MOVIE_RATING_GUEST = MOVIE_API_URL + '/movie/{movie_id}/rating?api_key=' + API_KEY
export const MOVIE_API_IMG_URL = 'https://image.tmdb.org/t/p/w500'

export const MOVIE_API_AUTH = MOVIE_API_URL + '/authentication';
export const MOVIE_API_AUTH_TOKEN = MOVIE_API_AUTH + '/token';
export const MOVIE_API_AUTH_TOKEN_REQUEST = MOVIE_API_AUTH_TOKEN + '/new?api_key=' + API_KEY;
export const MOVIE_API_AUTH_TOKEN_VALIDATE_WITH_LOGIN = MOVIE_API_AUTH_TOKEN + '/validate_with_login';

export const MOVIE_API_AUTH_AUTHENTICATE = MOVIE_API_URL + '/authenticate/{REQUEST_TOKEN}';

export const MOVIE_API_AUTH_SESSION = MOVIE_API_AUTH + '/session';
export const MOVIE_API_AUTH_SESSION_REQUEST = MOVIE_API_AUTH_SESSION + '/new?api_key=' + API_KEY;

export const MOVIE_API_AUTH_SESSION_GUEST = MOVIE_API_AUTH + '/guest_session';
export const MOVIE_API_AUTH_SESSION_GUEST_REQUEST = MOVIE_API_AUTH_SESSION_GUEST + '/new?api_key=' + API_KEY;

//
export const APP_NAME = 'Películas 1.0'
export const APP_SECRET_KEY = '123'

