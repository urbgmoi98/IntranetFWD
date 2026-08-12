import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Reveal from './common/Reveal';

const DashboardStaff = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api
      .get('/staff/stats')
      .then((res) => setStats(res.data))
      .catch(() => setStats({}));
  }, []);

  const cards = [
    { title: 'Calificaciones', count: stats.grades, icon: '📝', path: '/staff/grades', desc: 'Gestiona el CRUD de notas' },
    { title: 'Asistencia', count: stats.attendance, icon: '✅', path: '/staff/attendance', desc: 'Control diario de asistencia' },
    { title: 'Circulares', count: stats.circulars, icon: '📢', path: '/staff/circulars', desc: 'Publica comunicados oficiales' },
    { title: 'Reservas', count: stats.reservations, icon: '🏫', path: '/staff/reservations', desc: 'Reserva aulas con concurrencia' },
  ];

  return (
    <div className="dashboard">
      <Reveal>
        <header className="section-head">
          <h1 className="page-title">Panel de Control</h1>
          <p className="page-subtitle">
            Bienvenido de nuevo. Gestiona la actividad académica desde un solo lugar.
          </p>
        </header>
      </Reveal>

      <div className="cards-grid">
        {cards.map((card, idx) => (
          <Reveal key={card.path} delay={idx * 120}>
            <Link to={card.path} className="card-link">
              <article className="card-primary">
                <div className="card-icon">{card.icon}</div>
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p className="card-count">{card.count ?? 0}</p>
                  <p className="card-desc">{card.desc}</p>
                </div>
                <span className="card-arrow">→</span>
              </article>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <section className="panel quick-tip">
          <h3>💡 Tip del día</h3>
          <p>
            Usa el módulo de <strong>Reservas</strong> con control de concurrencia
            para evitar colisiones de horarios en aulas y laboratorios.
          </p>
        </section>
      </Reveal>
    </div>
  );
};

export default DashboardStaff;