import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
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
