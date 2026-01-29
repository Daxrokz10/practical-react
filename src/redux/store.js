import { createStore, combineReducers } from 'redux';
import { recipeReducer, authReducer } from './reducers';

const rootReducer = combineReducers({
  recipes: recipeReducer,
  auth: authReducer
});

const store = createStore(rootReducer);

export default store;
