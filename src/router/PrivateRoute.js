import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import PropTypes from 'prop-types';

// En argumentos ... es el rest
export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  localStorage.setItem(
    'lastPath',
    rest.location.pathname + (rest.location.search || '')
  );

  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? (
          // Aquí ... es el spread
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
