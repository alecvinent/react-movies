import * as ActionTypes from '../ActionTypes';

export const Movies = (state = {
    isLoading: true,
    error: false,
    message: null,
    movies: []
}, action) => {
    switch (action.type) {
        case ActionTypes.MOVIES_ADD:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: action.payload.message,
                page: action.payload.page,
                total_pages: action.payload.total_pages,
                total_results: action.payload.total_results,
                movies: action.payload.results
            };

        case ActionTypes.MOVIES_LOADING:
            return {...state, isLoading: true, error: false, message: null, movies: []}

        case ActionTypes.MOVIES_FAILED:
            return {...state, isLoading: false, error: true, message: action.payload};
        default :
            return state;
    }
}


