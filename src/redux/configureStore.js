import {createStore, combineReducers, applyMiddleware} from "redux";
import {Movies} from "../redux/reducers/movies";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {composeWithDevTools} from 'redux-devtools-extension';


//
export const ConfigureStore = () => {
  let middleware;

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(
      applyMiddleware(
        thunk,
        logger
      )
    )
  } else {
    middleware = applyMiddleware(
      thunk
    )
  }

  //
  const store = createStore(
    combineReducers({
      movies: Movies
    }),
    middleware);

  return store;
};
