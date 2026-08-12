import Reveal from '../common/Reveal';

const schedule = [
  { dia: 'Lunes', curso: 'Desarrollo Frontend', hora: '07:00 - 08:40', aula: 'Lab Cómputo A' },
  { dia: 'Lunes', curso: 'Bases de Datos', hora: '08:50 - 10:30', aula: 'Aula 12' },
  { dia: 'Martes', curso: 'Diseño de Interfaces', hora: '07:00 - 08:40', aula: 'Aula 8' },
  { dia: 'Martes', curso: 'Redes de Computadoras', hora: '08:50 - 10:30', aula: 'Lab Redes' },
  { dia: 'Miércoles', curso: 'Desarrollo Frontend', hora: '08:50 - 10:30', aula: 'Lab Cómputo A' },
  { dia: 'Jueves', curso: 'Bases de Datos', hora: '07:00 - 08:40', aula: 'Aula 12' },
  { dia: 'Viernes', curso: 'Diseño de Interfaces', hora: '10:40 - 12:20', aula: 'Aula 8' },
];

const StudentSchedule = () => (
  <div className="dashboard">
    <Reveal>
      <header className="section-head">
        <h1 className="page-title">Mi Horario</h1>
        <p className="page-subtitle">Plan semanal de clases del periodo en curso.</p>
      </header>
    </Reveal>

    <Reveal delay={120}>
      <section className="panel">
        <h3>🗓️ Semana de clases</h3>
        <div className="data-table-container">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Día</th>
                <th>Curso</th>
                <th>Hora</th>
                <th>Aula</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s, i) => (
                <tr key={i} className="row-enter">
                  <td>
                    <span className="badge">{s.dia}</span>
                  </td>
                  <td>{s.curso}</td>
                  <td>{s.hora}</td>
                  <td>{s.aula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Reveal>
  </div>
);

export default StudentSchedule;