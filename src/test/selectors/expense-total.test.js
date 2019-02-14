import expensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test("should return sum of all expenses amount", () => {
    const sum = expensesTotal(expenses);
    expect(sum).toBe(expenses[0].amount + expenses[1].amount + expenses[2].amount);
})

test("should return 0 if no expenses", () => {
    expect(expensesTotal([])).toBe(0);
})

test("should correctly return sum with only one expense", () => {
    expect(expensesTotal([expenses[0]])).toBe(expenses[0].amount);
})