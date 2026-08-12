import { useState } from 'react';
import Reveal from '../common/Reveal';

const GradesPanel = () => {
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState('');
  const students = [
    { id: 45, name: 'Mariana Fonseca' },
    { id: 46, name: 'Josué Quesada' },
    { id: 47, name: 'Valeria Campos' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const nota = Number(data.get('nota'));
    const estudiante = data.get('estudiante');
    if (nota < 0 || nota > 10) {
      setMessage('⚠️ La calificación debe estar entre 0 y 10.');
      return;
    }
    setRows((prev) => [
      { id: Date.now(), estudiante, nota, materia: data.get('materia') },
      ...prev,
    ]);
    setMessage('✅ Calificación registrada correctamente.');
    e.target.reset();
    setTimeout(() => setMessage(''), 3500);
  };

  const removeRow = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="dashboard">
      <Reveal>
        <header className="section-head">
          <h1 className="page-title">Calificaciones</h1>
          <p className="page-subtitle">Registra, consulta y elimina notas del periodo.</p>
        </header>
      </Reveal>

      {message && <div className="toast inline-toast">{message}</div>}

      <div className="two-col">
        <Reveal>
          <section className="panel">
            <h3>📝 Registrar calificación</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="g-estudiante">Estudiante</label>
                <select id="g-estudiante" name="estudiante" required>
                  {students.map((s) => (
                    <option key={s.id} value={`${s.id} - ${s.name}`}>
                      {s.id} - {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="g-materia">Materia</label>
                <select id="g-materia" name="materia" required>
                  <option>Desarrollo Frontend</option>
                  <option>Bases de Datos Relacionales</option>
                  <option>Diseño de Interfaces</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="g-nota">Calificación (0 - 10)</label>
                <input
                  id="g-nota"
                  name="nota"
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  placeholder="Ej: 9.4"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Registrar Nota
              </button>
            </form>
          </section>
        </Reveal>

        <Reveal delay={150}>
          <section className="panel">
            <h3>📊 Historial reciente</h3>
            {rows.length === 0 ? (
              <p className="empty-state">Aún no hay calificaciones registradas.</p>
            ) : (
              <div className="data-table-container">
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>Estudiante</th>
                      <th>Materia</th>
                      <th>Nota</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id} className="row-enter">
                        <td>{r.estudiante}</td>
                        <td>{r.materia}</td>
                        <td>
                          <span className="badge badge-grade">{r.nota.toFixed(2)}</span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn-icon danger"
                            onClick={() => removeRow(r.id)}
                            title="Eliminar"
                          >
                            🗑️
                          </button>
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

export default GradesPanel;