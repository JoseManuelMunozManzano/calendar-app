import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';

import '../styles.css';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  // Cuando el checking retorne false ya se seguro que estoy autenticado
  // Puedo hacer el render
  if (checking) {
    return (
      <div className="sk-chase-main">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={!!uid}
          />

          <PrivateRoute
            exact
            path="/"
            component={CalendarScreen}
            isAuthenticated={!!uid}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
