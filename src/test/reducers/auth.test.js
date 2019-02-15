import authReducer from '../../reducers/auth';

test("should set default state", () => {
    const state = authReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual({});
});

test("should set uid on login", () => {
    const action = { type: 'LOGIN', uid: '123' }; 
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
});

test("should remove uid on logout", () => {
    const action = { type: 'LOGOUT' };
    const state = authReducer({ uid: '123' }, action);
    expect(state.uid).toBeFalsy();
});