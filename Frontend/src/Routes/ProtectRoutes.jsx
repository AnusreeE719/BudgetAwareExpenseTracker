// src/utils/ProtectedRoute.jsx
import { useAuth } from '../Context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    // Additional client-side token validation
    if (user?.token) {
      const checkTokenValidity = () => {
        try {
          const token = user.token;
          const decoded = decodeToken(token);
          
          if (!decoded?.exp) {
            setIsTokenValid(false);
            logout();
            return;
          }

          const isExpired = Date.now() >= decoded.exp * 1000;
          if (isExpired) {
            setIsTokenValid(false);
            logout();
          } else {
            setIsTokenValid(true);
          }
        } catch (error) {
          console.error('Token validation error:', error);
          setIsTokenValid(false);
          logout();
        }
      };

      // Check immediately and then every minute
      checkTokenValidity();
      const interval = setInterval(checkTokenValidity, 60000);
      return () => clearInterval(interval);
    }
  }, [user, logout]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <FaSpinner className='text-4xl animate-[spin_1s_linear_infinite]' />
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <Navigate 
        to="/signin" 
        replace 
        state={{ 
          from: location,
          message: 'Your session has expired. Please sign in again.' 
        }} 
      />
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate 
      to="/signin" 
      replace 
      state={{ from: location }} 
    />
  );
};

// Helper function to decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};

export default ProtectedRoute;