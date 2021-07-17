import * as ActionTypes from './ActionTypes';
import {MOVIE_API_MOVIE_DETAILS, MOVIE_API_POPULAR_MOVIES} from '../shared/baseUrl';
import fetch from 'cross-fetch';

//***************************************
// movies
export const fetchPopularMovies = () => async (dispatch) => {

    dispatch(moviesLoading());

    return await fetch(MOVIE_API_POPULAR_MOVIES)
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(movies => dispatch(addMovie(movies)))
        .catch(error => {
            dispatch(moviesFailed(error.message))
        });
}

export const fetchMovieDetails = ({movie_id}) => async (dispatch) => {
    console.log('fetchMovieDetails movieID: ', movie_id);
    const url = MOVIE_API_MOVIE_DETAILS + '/' + movie_id;
    console.log('url: ', url);

    dispatch(moviesLoading());


    return fetch(url)
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(movie => dispatch(addMovie(movie)))
        .catch(error => dispatch(moviesFailed(error.message)));
}

//
export const moviesLoading = () => ({
    type: ActionTypes.MOVIES_LOADING
});

//
export const addMovie = (movies) => ({
    type: ActionTypes.MOVIES_ADD,
    payload: movies
});

//
export const moviesFailed = (errmess) => ({
    type: ActionTypes.MOVIES_FAILED,
    payload: errmess
});

// *********************************
export const postRating = () => {

};