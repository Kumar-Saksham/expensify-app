import React from "react";
import { connect } from "react-redux";

import SelectExpenses from "../selectors/expenses";
import ExpensesTotal from "../selectors/expenses-total";
import numeral from 'numeral';

export const ExpensesSummary = ({ expensesTotal, expensesCount }) => {
  const expensesWord = expensesCount === 1 ? 'expense': 'expenses';
  const formattedExpenseTotal = numeral(expensesTotal / 100).format('0,0.00');
  
  return (
    <div>
    <h1>Viewing {expensesCount} {expensesWord} totalling {formattedExpenseTotal}</h1>
    </div>
  );
};

const mapStateToProps = state => {
  const filteredExpenses = SelectExpenses(state.expenses, state.filters);
  return {
    expensesCount: filteredExpenses.length,
    expensesTotal: ExpensesTotal(filteredExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
