import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api
        .get('/auth/me')
        .then((res) => setUser(res.data.user))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      const demo = localStorage.getItem('demo_user');
      if (demo) {
        try {
          setUser(JSON.parse(demo));
        } catch {
          localStorage.removeItem('demo_user');
        }
      }
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return user;
    } catch (err) {
      // Modo demo: si el backend no está disponible, usa un usuario simulado
      // para que la intranet sea navegable de forma autónoma.
      const isNetworkError = !err.response;
      if (isNetworkError) {
        const demoUser = buildDemoUser(email);
        localStorage.setItem('demo_user', JSON.stringify(demoUser));
        setUser(demoUser);
        return demoUser;
      }
      throw err;
    }
  };

  const buildDemoUser = (email) => {
    const lower = String(email || '').toLowerCase();
    const isStaff = lower.includes('docente') || lower.includes('staff') || lower.includes('profesor');
    if (isStaff) {
      return { id: 1, nombre: 'Carlos', apellido: 'Alvarado', email, rol: 'staff' };
    }
    return { id: 2, nombre: 'Mariana', apellido: 'Fonseca', email, rol: 'estudiante' };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('demo_user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);