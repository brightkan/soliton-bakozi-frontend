import React from 'react';
import { Route ,Redirect} from 'react-router-dom';
import * as auth from '../../services/authService'

const user = auth.getCurrentUser()

const ProtectedRoute = ({ component: Component, render,...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!user) return <Redirect to="/login" />;
      return Component? <Component {...props} user={user}/>:render(props);
    }}
  />
);

export default ProtectedRoute;
