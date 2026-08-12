import { useState } from 'react';
import Reveal from '../common/Reveal';

const AttendancePanel = () => {
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState('');
  const students = ['Mariana Fonseca', 'Josué Quesada', 'Valeria Campos'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setRows((prev) => [
      {
        id: Date.now(),
        estudiante: data.get('estudiante'),
        fecha: data.get('fecha'),
        estado: data.get('estado'),
      },
      ...prev,
    ]);
    setMessage('✅ Asistencia registrada correctamente.');
    e.target.reset();
    setTimeout(() => setMessage(''), 3500);
  };

  const estadoIcon = (estado) =>
    estado === 'presente' ? '🟢' : estado === 'tardanza' ? '🟡' : '🔴';

  return (
    <div className="dashboard">
      <Reveal>
        <header className="section-head">
          <h1 className="page-title">Asistencia</h1>
          <p className="page-subtitle">Control diario de presencia de los estudiantes.</p>
        </header>
      </Reveal>

      {message && <div className="toast inline-toast">{message}</div>}

      <div className="two-col">
        <Reveal>
          <section className="panel">
            <h3>✅ Registrar asistencia</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="a-estudiante">Estudiante</label>
                <select id="a-estudiante" name="estudiante" required>
                  {students.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="a-fecha">Fecha</label>
                <input id="a-fecha" name="fecha" type="date" required />
              </div>
              <div className="form-group">
                <label htmlFor="a-estado">Estado</label>
                <select id="a-estado" name="estado" required>
                  <option value="presente">Presente</option>
                  <option value="tardanza">Tardanza</option>
                  <option value="ausente">Ausente</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Guardar Asistencia
              </button>
            </form>
          </section>
        </Reveal>

        <Reveal delay={150}>
          <section className="panel">
            <h3>📋 Registro del día</h3>
            {rows.length === 0 ? (
              <p className="empty-state">Aún no hay registros de asistencia.</p>
            ) : (
              <div className="data-table-container">
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>Estudiante</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id} className="row-enter">
                        <td>{r.estudiante}</td>
                        <td>{r.fecha}</td>
                        <td>
                          <span className="badge">
                            {estadoIcon(r.estado)} {r.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </Reveal>
      </div>
    </div>
  );
};

export default AttendancePanel;