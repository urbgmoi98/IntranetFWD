import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './DashboardStaff.css';

const DashboardStaff = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    api.get('/staff/stats').then(res => setStats(res.data));
  }, []);

  const cards = [
    { title: 'Calificaciones', count: stats.grades, icon: '📊', path: '/staff/grades' },
    { title: 'Asistencia', count: stats.attendance, icon: '✅', path: '/staff/attendance' },
    { title: 'Circulares', count: stats.circulars, icon: '📢', path: '/staff/circulars' },
    { title: 'Reservas', count: stats.reservations, icon: '🏫', path: '/staff/reservations' },
  ];

  return (
    <div className="dashboard-staff">
      <h1>Panel de Control</h1>
      <div className="cards-grid">
        {cards.map((card, idx) => (
          <Link to={card.path} key={idx} className="card-link">
            <div className="card" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="card-icon">{card.icon}</div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p className="card-count">{card.count ?? 0}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};