import React from "react";
import { connect } from "react-redux";

import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push("/dashboard");
  };

  onClick = () => {
    this.props.removeExpense( this.props.expense.id);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className='page'>
        <h1 className="page-title">Edit Expense</h1>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <div className="edit-expense__button-cont"><button onClick={this.onClick} className="button edit-expense__remove">Remove</button></div>
        <div className="floaty edit-expense__remove-floaty" onClick={this.onClick}><img className="" src="/images/cross.svg" /></div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      expense => expense.id === props.match.params.id
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    removeExpense: id => dispatch(startRemoveExpense(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
