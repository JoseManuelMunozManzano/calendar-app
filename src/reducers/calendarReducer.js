import moment from 'moment';
import { types } from '../types/types';

const initalState = {
  events: [
    {
      title: 'Cumpleaños del jefe',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgcolor: '#fafafa',
      notes: 'Comprar el pastel',
      user: {
        _id: '123',
        name: 'José Manuel',
      },
    },
  ],
  activeEvent: null, // Objeto con todas las propiedades del evento activo
};

export const calendarReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    default:
      return state;
  }
};
