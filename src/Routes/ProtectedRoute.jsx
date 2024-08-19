// src/Routes/ProtectedRoute.js
import React from 'react';
import { Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const currentUser = useSelector((state) => state.variables.currentUser);
  

  if (!currentUser.username) {
    return <Navigate to="/Login"  />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
