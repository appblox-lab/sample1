import { combineReducers, createStore, applyMiddleware } from "redux";
import { nameReducer } from './exampleReducer';

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const staticReducers = {
  name: nameReducer,
  age: (state = "30", action) => state
}


/**
 * This was created in reference to redux docs:
 * https://redux.js.org/recipes/code-splitting/#defining-an-injectreducer-function
 */
export default function configureStore(initialState) {
  const store = createStore(createReducer(), initialState, applyMiddleware(logger));

  // store.asyncReducers = {};

  // store.injectReducer = (asyncReducer) => {
  //   store.replaceReducer(createReducer(asyncReducer));
  // };

  return store;
}

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers
  });
}

export const store = configureStore();
