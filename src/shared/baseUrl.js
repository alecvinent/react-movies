const API_KEY = 'b1fd920cf962b644b0a09f8e8a075dd2'
export const MOVIE_API_URL = 'https://api.themoviedb.org/3'
export const MOVIE_API_POPULAR_MOVIES = MOVIE_API_URL + '/movie/popular?api_key=' + API_KEY + '&page=1'
export const MOVIE_API_MOVIE_DETAILS = MOVIE_API_URL + '/movie/{movie_id}?api_key=' + API_KEY
export const MOVIE_API_MOVIE_REVIEWS = MOVIE_API_URL + '/movie/{movie_id}/reviews?api_key=' + API_KEY
export const IMG_URL = 'https://image.tmdb.org/t/p/w500'