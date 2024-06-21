

import React from 'react'
import { Navigate } from 'react-router-dom';

function RootRedirect() {

    const isAuthenticated = !!localStorage.getItem('userId');
    return isAuthenticated ? <Navigate to="/chat" replace /> : <Navigate to="/login" replace />;

}

export default RootRedirect