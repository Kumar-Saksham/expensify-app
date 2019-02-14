import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "12" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "12"
  });
});

test("should setup edit expense action object", () => {
  const action = editExpense(12, {
    description: "apple",
    amount: "123",
    note: "sweet apple"
  });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: 12,
    update: { description: "apple", amount: "123", note: "sweet apple" }
  });
});

test("should setup add expense action object with provided data", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("should add expense to database ans store", done => {
  const store = createMockStore({});
  store.dispatch(startAddExpense({ ...expenses[0] })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        ...expenses[0],
        id: expect.any(String)
      }
    });

    database
      .ref(`expenses/${actions[0].expense.id}`)
      .once("value")
      .then(snapshot => {
        expect(snapshot.val()).toEqual({
          amount: expenses[0].amount,
          createdAt: expenses[0].createdAt,
          amount: expenses[0].amount,
          note: expenses[0].note,
          description: expenses[0].description
        });
        done();
      });
  });
});

test("should add expense with defaults to database and store", () => {
  
});

// test("should setup add expense action object with default data", () => {
//   const action = addExpense({});
//   expect(action).toEqual({ type: "ADD_EXPENSE", expense: {
//     id: expect.any(String),
//     description: "",
//     note: "",
//     amount: 0,
//     createdAt: 0
//     } });
// });
