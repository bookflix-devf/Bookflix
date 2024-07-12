import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  //user
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  //login
  const login = async (email, password) => {
    try {
      //TODO axios.post /api/auth/login
      const { data } = await api.post('/auth/login', {
        email,
        password,
      });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);

      const response = await api.get('/auth/me', {
        headers: {
          Authorization: data.token,
        },
      });

      setUser(response.data.user);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  //logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
