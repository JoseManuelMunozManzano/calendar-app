import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';

import '@testing-library/jest-dom';

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive, eventStartLoading } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  ui: {
    modalOpen: false,
  },
  calendar: {
    events: [],
  },
  auth: {
    uid: '123ABC',
  },
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe('Pruebas en <CalendarScreen />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('pruebas con las interacciones del calendario', () => {
    const calendar = wrapper.find('Calendar');

    // Verificar que calendar tiene los messages
    const calendarMessages = calendar.prop('messages');
    expect(calendarMessages).toEqual(messages);

    // Doble click
    calendar.prop('onDoubleClickEvent')();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.uiOpenModal,
    });

    // Evento seleccionado. El expect se hace con un mock esta vez
    calendar.prop('onSelectEvent')({ start: 'Hola' });
    expect(eventSetActive).toHaveBeenCalledWith({
      start: 'Hola',
    });

    // Si cambia el onView debemos asegurarnos de que haya sido cambiado en el localStorage
    // Se usa act() porque esta instrucción hace una modificación con el setState
    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
    });
  });
});
