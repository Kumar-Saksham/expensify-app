import React from "react";
import { connect } from "react-redux";
import selectExpenses from "../selectors/expenses";

import ExpenseListItem from "./ExpenseListItem";

export const ExpenseList = props => (
  <div className="expense-list" >
    {props.expenses.length === 0 ? (
      <div className="expense-list__empty-message">No Expenses</div>
    ) : (
      props.expenses.map(expense => (
        <ExpenseListItem key={expense.id} {...expense} />
      ))
    )}
  </div>
);

const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);
