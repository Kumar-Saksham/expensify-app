import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test("should set dafault state", () => {
    const state = expensesReducer(undefined, "@@INIT");
    expect(state).toEqual([]);
});

test("should remove expense by id", () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id not found", () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test("should add an expense", () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            description: 'coffee',
            amount: 5000,
            note: '',
            createdAt: 5000
        }
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([...expenses, action.expense])
});

test("should edit an expense", () => {
    const action = {
        type: "EDIT_EXPENSE",
        id: expenses[0].id,
        update: {
            description: 'APPLE'
        }
    }

    const state = expensesReducer(expenses, action);
    expect(state[0].description).toBe('APPLE');
});

test("should note edit an expense if id not found", () => {
    const action = {
        type: "EDIT_EXPENSE",
        id: -1,
        update: {
            amount: 99999
        }
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})