import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isStaff = user?.rol === 'staff';

  const navItems = isStaff
    ? [
        { to: '/staff', end: true, icon: '📊', label: 'Panel' },
        { to: '/staff/grades', icon: '📝', label: 'Calificaciones' },
        { to: '/staff/attendance', icon: '✅', label: 'Asistencia' },
        { to: '/staff/circulars', icon: '📢', label: 'Circulares' },
        { to: '/staff/reservations', icon: '🏫', label: 'Reservas' },
      ]
    : [
        { to: '/student', end: true, icon: '🏠', label: 'Inicio' },
        { to: '/student/grades', icon: '📊', label: 'Notas' },
        { to: '/student/schedule', icon: '🗓️', label: 'Horario' },
        { to: '/student/materials', icon: '📚', label: 'Material' },
        { to: '/student/circulars', icon: '📢', label: 'Avisos' },
      ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const fullName = user ? `${user.nombre || ''} ${user.apellido || ''}`.trim() : 'Usuario';

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">🏫 Intranet Escolar</div>
        <div className="topbar-user">
          <span className="avatar">{fullName.charAt(0).toUpperCase() || 'U'}</span>
          <div className="user-meta">
            <strong>{fullName}</strong>
            <span>{isStaff ? 'Docente' : 'Estudiante'}</span>
          </div>
          <button className="btn btn-ghost" onClick={handleLogout} title="Cerrar sesión">
            Salir
          </button>
        </div>
      </header>

      <div className="shell-body">
        <aside className="sidebar">
          <nav className="side-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `side-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="side-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="content">
          <div className="page-transition">{children}</div>
        </main>
      </div>

      <nav className="bottom-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `bottom-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="bottom-icon">{item.icon}</span>
            <span className="bottom-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;