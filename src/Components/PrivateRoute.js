import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ element: Component, ...rest }) {
    const { usuario } = useAuth();
    return usuario ? <Component {...rest} /> : <Navigate to="/login" />;
}

export default PrivateRoute;
