import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';
import { startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

const store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones auth.js', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('startLogin correcto', async () => {
    await store.dispatch(startLogin('jose@hotmail.com', '123456'));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );

    //const token = localStorage.setItem.mock.calls[0][1];
    //console.log(localStorage.setItem.mock.calls[0][1]);
  });

  test('startLogin incorrecto', async () => {
    await store.dispatch(startLogin('jose@hotmail.com', '123456789'));
    let actions = store.getActions();

    expect(actions).toEqual([]);

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Password incorrecto',
      'error'
    );

    await store.dispatch(startLogin('josexxxxxxxxx@hotmail.com', '123456'));
    actions = store.getActions();

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'El usuario no existe con ese correo',
      'error'
    );
  });

  test('startRegister correcto', async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'jose',
          token: 'ABC123ABC123',
        };
      },
    }));

    await store.dispatch(startRegister('test@test.com', '123456', 'test'));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: '123', name: 'jose' },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );
  });
});
