import Reveal from '../common/Reveal';

const circulars = [
  {
    titulo: 'Suspensión de clases por mantenimiento',
    fecha: '15 de agosto',
    contenido:
      'Se suspenden las clases del 15 de agosto por trabajos de mantenimiento eléctrico en el campus.',
    audience: 'Todos',
  },
  {
    titulo: 'Semana de exámenes finales',
    fecha: '25 de agosto',
    contenido:
      'Se aproximan las evaluaciones finales del periodo. Consulta el calendario de exámenes.',
    audience: 'Estudiantes',
  },
  {
    titulo: 'Reunión de padres de familia',
    fecha: '02 de septiembre',
    contenido:
      'Invitación a la reunión bimestral de padres y representantes en el auditorio central.',
    audience: 'Familias',
  },
];

const StudentCirculars = () => (
  <div className="dashboard">
    <Reveal>
      <header className="section-head">
        <h1 className="page-title">Avisos oficiales</h1>
        <p className="page-subtitle">Comunicados y circulares de la institución.</p>
      </header>
    </Reveal>

    <Reveal delay={120}>
      <section className="panel">
        <h3>📢 Últimas circulares</h3>
        <div className="circular-list">
          {circulars.map((c, i) => (
            <article key={i} className="circular-item row-enter">
              <div className="circular-head">
                <h4>{c.titulo}</h4>
                <span className="badge">{c.fecha}</span>
              </div>
              <p>{c.contenido}</p>
              <span className="circular-audience">Para: {c.audience}</span>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  </div>
);

export default StudentCirculars;