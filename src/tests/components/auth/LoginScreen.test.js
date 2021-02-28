import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Swal from 'sweetalert2';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

Swal.fire = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe('Pruebas en <LoginScreen />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de llamar el dispatch del login', () => {
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: {
        name: 'lEmail',
        value: 'jose@hotmail.com',
      },
    });

    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: {
        name: 'lPassword',
        value: '123456',
      },
    });

    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault() {},
    });

    // Confirmamos que se ha llamado startLogin con los argumentos deseados. Se usa un mock
    expect(startLogin).toHaveBeenCalledWith('jose@hotmail.com', '123456');
  });

  test('no hay registro si los passwords son diferentes', () => {
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: '123456',
      },
    });

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '123456789',
      },
    });

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {},
    });

    expect(startRegister).not.toHaveBeenCalled();

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Las contraseñas debe de ser iguales',
      'error'
    );
  });

  test('Registro con contraseñas iguales', () => {
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: '123456',
      },
    });

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '123456',
      },
    });

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {},
    });

    expect(Swal.fire).not.toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledWith(
      'marina@hotmail.com',
      '123456',
      'Marina'
    );
  });
});
