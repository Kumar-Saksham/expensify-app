import React from "react";
import { shallow } from "enzyme";

import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let wrapper, expense, editExpenseSpy, historySpy, removeExpenseSpy;
beforeEach(() => {
  editExpenseSpy = jest.fn();
  historySpy = { push: jest.fn() };
  removeExpenseSpy = jest.fn();
  expense = expenses[1];
  wrapper = shallow(
    <EditExpensePage
      expense={expense}
      editExpense={editExpenseSpy}
      history={historySpy}
      removeExpense={removeExpenseSpy}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expense);
  expect(editExpenseSpy).toHaveBeenLastCalledWith(expense.id, expense);
  expect(historySpy.push).toHaveBeenLastCalledWith("/dashboard");
});

test("should handle removeExpense", () => {
  wrapper.find("button").simulate("click");
  expect(removeExpenseSpy).toHaveBeenLastCalledWith( expense.id );
  expect(historySpy.push).toHaveBeenLastCalledWith("/dashboard");
});
