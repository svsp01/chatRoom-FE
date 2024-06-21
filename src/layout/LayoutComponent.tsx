import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function LayoutComponent() {
  const isAuthenticated = !!localStorage.getItem('userId');

  if (isAuthenticated) {
    return (
      <div>
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default LayoutComponent;