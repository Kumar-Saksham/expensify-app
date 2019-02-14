import React from "react";
import { shallow } from "enzyme";

import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render expense list with filter correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render expense list with altFilter correctly", () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const value = "coffee";
  wrapper
    .find("input")
    .at(0)
    .simulate("change", { target: { value } });
  expect(setTextFilter).toHaveBeenLastCalledWith({ text: value });
});

test("should sort by Date", () => {
    const value = "date";
    wrapper.find('select').simulate("change", { target: {value}});
    expect(sortByDate).toHaveBeenCalled();
})

test("should sort by amount", () => {
    const value = "amount";
    wrapper.find('select').simulate("change", { target: { value }});
    expect(sortByAmount).toHaveBeenCalled();
})

test("should handle Date change", () => {
    const { startDate, endDate } = altFilters;
    wrapper.find("DateRangePicker").prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
})

test("should handle date focus changes", () => {
    const value = 'startDate';
    wrapper.find("DateRangePicker").prop('onFocusChange')(value);
    expect(wrapper.state('calanderFocused')).toBe(value);
})
