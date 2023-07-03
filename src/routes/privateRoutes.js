
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from "../context"

export const PrivateRoute = ({ children }) => {
    const { isUserLoggedIn } = useUserAuth();
    return isUserLoggedIn ?<>{children}</>: <Navigate to="/signin" />
};

