import Reveal from '../common/Reveal';

const grades = [
  { materia: 'Desarrollo Frontend', eval: 'Proyecto I', nota: 9.6 },
  { materia: 'Desarrollo Frontend', eval: 'Examen', nota: 9.0 },
  { materia: 'Bases de Datos Relacionales', eval: 'Examen Parcial', nota: 8.85 },
  { materia: 'Bases de Datos Relacionales', eval: 'Taller SQL', nota: 9.1 },
  { materia: 'Diseño de Interfaces', eval: 'Portafolio', nota: 9.4 },
  { materia: 'Redes de Computadoras', eval: 'Laboratorio', nota: 8.6 },
];

const StudentGrades = () => (
  <div className="dashboard">
    <Reveal>
      <header className="section-head">
        <h1 className="page-title">Mis Calificaciones</h1>
        <p className="page-subtitle">Consulta tu rendimiento académico del periodo (solo lectura).</p>
      </header>
    </Reveal>

    <Reveal delay={120}>
      <section className="panel">
        <h3>📊 Calificaciones del periodo</h3>
        <div className="data-table-container">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Asignatura</th>
                <th>Evaluación</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i} className="row-enter">
                  <td>{g.materia}</td>
                  <td>{g.eval}</td>
                  <td>
                    <span className={`badge badge-grade ${g.nota < 7 ? 'low' : ''}`}>
                      {g.nota.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Reveal>
  </div>
);

export default StudentGrades;