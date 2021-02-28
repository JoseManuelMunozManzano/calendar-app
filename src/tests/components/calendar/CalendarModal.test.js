import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import '@testing-library/jest-dom';
import { CalendarModal } from '../../../components/calendar/CalendarModal';

// jest.mock('../../../actions/events', () => ({
//   eventSetActive: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
  ui: {
    modalOpen: true,
  },
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hola Mundo',
      notes: 'Algunas notas',
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  auth: {
    uid: '123ABC',
  },
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe('Pruebas en <CalendarModal />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('debe de mostrar el modal', () => {
    // Esta prueba no vale. Siempre la pasa porque .modal existe
    //expect(wrapper.find('.modal').exists()).toBe(true);

    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });
});
