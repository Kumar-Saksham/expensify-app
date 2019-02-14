import { addExpense, editExpense, removeExpense } from "../../actions/expenses";
import uuid from "uuid";

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
  const expenseData = {
    description: "coffee",
    amount: 123,
    createdAt: 1000,
    note: "noice coffee"
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {...expenseData, id: expect.any(String) }
  });
});

test("should setup add expense action object with default data", () => {
  const action = addExpense({});
  expect(action).toEqual({ type: "ADD_EXPENSE", expense: {
    id: expect.any(String),
    description: "",
    note: "",
    amount: 0,
    createdAt: 0
    } });
});
