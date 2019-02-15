import uuid from "uuid";

import database from "../firebase/firebase";

export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    return database
      .ref(`users/${uid}/expenses`)
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};

export const removeExpense = ({ id }) => ({ type: "REMOVE_EXPENSE", id });

export const startRemoveExpense = (id) => {
  return (dispatch, getState) => {
    return database.ref(`users/${getState().auth.uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};

export const editExpense = (id, update) => ({
  type: "EDIT_EXPENSE",
  id,
  update
});

export const startEditExpense = (id, update) => {
  return (dispatch, getState) => {
    return database.ref(`users/${getState().auth.uid}/expenses/${id}`).update(update).then(() => {
      dispatch(editExpense(id, update));
    })
  }
};




export const setExpenses = expenses => ({
  type: "SET_EXPENSES",
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    return database
      .ref(`users/${getState().auth.uid}/expenses`)
      .once("value")
      .then(snapshot => {
        const expensesData = [];
        snapshot.forEach(expense => {
          expensesData.push({ id: expense.key, ...expense.val() });
        });
        dispatch(setExpenses(expensesData));
      });
  };
};
