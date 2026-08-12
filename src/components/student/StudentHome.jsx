import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';

const StudentHome = () => {
  const cards = [
    { to: '/student/grades', icon: '📊', title: 'Mis Notas', desc: 'Consulta tus calificaciones del periodo', color: 'grad-1' },
    { to: '/student/schedule', icon: '🗓️', title: 'Horario', desc: 'Plan semanal de clases', color: 'grad-2' },
    { to: '/student/materials', icon: '📚', title: 'Material', desc: 'Descarga tareas y guías', color: 'grad-3' },
    { to: '/student/circulars', icon: '📢', title: 'Avisos', desc: 'Comunicados oficiales', color: 'grad-4' },
  ];

  return (
    <div className="dashboard">
      <Reveal>
        <header className="section-head">
          <h1 className="page-title">Hola, estudiante 👋</h1>
          <p className="page-subtitle">
            Bienvenido a tu portal informativo. Todo tu avance académico en un solo lugar.
          </p>
        </header>
      </Reveal>

      <div className="cards-grid">
        {cards.map((card, idx) => (
          <Reveal key={card.to} delay={idx * 120}>
            <Link to={card.to} className="card-link">
              <article className={`card-primary ${card.color}`}>
                <div className="card-icon">{card.icon}</div>
                <div className="card-content">
                  <h3>{card.title}</h3>
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
          <h3>🏆 Resumen del periodo</h3>
          <div className="stat-row">
            <div className="stat">
              <strong>9.2</strong>
              <span>Promedio general</span>
            </div>
            <div className="stat">
              <strong>0</strong>
              <span>Materias en riesgo</span>
            </div>
            <div className="stat">
              <strong>2</strong>
              <span>Tareas pendientes</span>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default StudentHome;