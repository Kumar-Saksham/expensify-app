import { login, logout } from '../../actions/auth';

test('should setup login action object', () => {
    const uid = '123';
    expect(login(uid)).toEqual({type: 'LOGIN', uid});
});

test('should setup logout action object', () => {
    expect(logout()).toEqual({type: 'LOGOUT' });
});