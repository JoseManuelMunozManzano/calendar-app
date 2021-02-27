import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { startLogin } from '../../actions/auth';
import { types } from '../../types/types';

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
});
