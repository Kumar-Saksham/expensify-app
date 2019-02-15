import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import authReducer from '../reducers/auth';
import expenseReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  return createStore(
    combineReducers({
      expenses: expenseReducer,
      filters: filtersReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
};
