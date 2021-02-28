import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initState = {
  checking: true,
};

const action = {
  type: types.authLogin,
  payload: {
    uid: 'ABC123ABC123',
    name: 'José Manuel',
  },
};

const loginState = {
  checking: false,
  uid: 'ABC123ABC123',
  name: 'José Manuel',
};

describe('Pruebas en authReducer', () => {
  test('debe de retornar el estado por defecto', () => {
    const state = authReducer(initState, {});
    expect(state).toEqual({ checking: true });
  });

  test('debe de autenticar el usuario', () => {
    const state = authReducer(initState, action);

    expect(state).toEqual(expect.objectContaining(loginState));
  });

  test('debe de pasar authCheckingFinish', () => {
    const state = authReducer(loginState, {
      type: types.authCheckingFinish,
    });

    expect(state).toEqual(loginState);
  });

  test('debe de hacer logout', () => {
    const state = authReducer(loginState, {
      type: types.authLogout,
    });

    expect(state).toEqual({ checking: false });
  });
});
