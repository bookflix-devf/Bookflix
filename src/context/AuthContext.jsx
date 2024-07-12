import { useContext, useEffect, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  const fetchUserData = async (token) => {
    try {
      const userRes = await api.get('/auth/me', {
        headers: {
          Authorization: token,
        },
      });
      setUser(userRes.data.user);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  const loginAction = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      if (res.data) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        const userRes = await api.get('/auth/me', {
          headers: {
            Authorization: res.data.token,
          },
        });
        setUser(userRes.data.user);
        console.log('holaaa');
        navigate('/profile');
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
