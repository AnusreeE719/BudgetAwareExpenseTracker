// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const AuthContext = createContext();

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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutTimerRef = useRef();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }, []);

  const initializeAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');

    if (token) {
      try {
        const decoded = decodeToken(token);
        
        // Validate token structure and expiration
        if (!decoded?.exp) {
          throw new Error('Invalid token structure');
        }

        const expirationTime = decoded.exp * 1000;
        if (Date.now() >= expirationTime) {
          throw new Error('Token expired');
        }

        // Parse user data
        let parsedUserData = {};
        if (userData) {
          try {
            parsedUserData = JSON.parse(userData);
          } catch (parseError) {
            console.error('Corrupted user data', parseError);
            localStorage.removeItem('userData');
          }
        }

        // Set user and schedule logout
        setUser({ token, ...parsedUserData });
        const timeUntilExpiration = expirationTime - Date.now();
        logoutTimerRef.current = setTimeout(logout, timeUntilExpiration);

      } catch (error) {
        console.error('Authentication error:', error.message);
        logout();
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [logout]);

  const login = useCallback((token, userData) => {
    try {
      // Clear existing timer
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
      }

      // Validate token before storing
      const decoded = decodeToken(token);
      if (!decoded?.exp) {
        throw new Error('Invalid token');
      }

      const expirationTime = decoded.exp * 1000;
      if (Date.now() >= expirationTime) {
        throw new Error('Token expired');
      }

      // Store auth data
      localStorage.setItem('token', token);
      if (userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
      } else {
        localStorage.removeItem('userData');
      }

      // Set user and schedule logout
      setUser({ token, ...userData });
      const timeUntilExpiration = expirationTime - Date.now();
      logoutTimerRef.current = setTimeout(logout, timeUntilExpiration);

    } catch (error) {
      console.error('Login failed:', error.message);
      logout();
      throw error;
    }
  }, [logout]);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Sync auth state across tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'token' || event.key === 'userData') {
        initializeAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [initializeAuth]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);