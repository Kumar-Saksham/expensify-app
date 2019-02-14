import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import AppRouter from "./routers/AppRouter";

import configureStore from "./store/configureStore";

import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";

import 'react-dates/lib/css/_datepicker.css';
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

console.log(store.getState());

store.dispatch(
  addExpense({ description: "Water Bill", amount: 1000, createdAt: 5000 })
);
store.dispatch(
  addExpense({ description: "Gas Bill", amount: 2000, createdAt: 3000 })
);
store.dispatch(
  addExpense({ description: "Rent", amount: 109500, createdAt: 4000 })
);

console.log(store.getState());

console.log(
  getVisibleExpenses(store.getState().expenses, store.getState().filters)
);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
