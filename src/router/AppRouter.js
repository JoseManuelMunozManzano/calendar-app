import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          {/* Usando el component */}
          <Route exact path="/login" component={LoginScreen} />

          {/* Usando Higher Order Component */}
          <Route exact path="/">
            <CalendarScreen />
          </Route>

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
