import { useState } from 'react';
import Reveal from '../common/Reveal';
import { demoDb } from '../../db/demoDb';

const CircularsPanel = () => {
  const [circulars, setCirculars] = useState(() => demoDb.get('circulars'));
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    demoDb.insert('circulars', {
      titulo: data.get('titulo'),
      contenido: data.get('contenido'),
      destinatarios: data.get('destinatarios'),
      fecha: new Date().toLocaleDateString('es-CR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    });
    setCirculars(demoDb.get('circulars'));
    setMessage('✅ Circular publicada.');
    e.target.reset();
    setTimeout(() => setMessage(''), 3500);
  };

  return (
    <div className="dashboard">
      <Reveal>
        <header className="section-head">
          <h1 className="page-title">Circulares</h1>
          <p className="page-subtitle">Publica y administra comunicados oficiales.</p>
        </header>
      </Reveal>

      {message && <div className="toast inline-toast">{message}</div>}

      <div className="two-col">
        <Reveal>
          <section className="panel">
            <h3>📢 Nueva circular</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="c-titulo">Título</label>
                <input
                  id="c-titulo"
                  name="titulo"
                  type="text"
                  placeholder="Ej: Suspensión de clases 15/08"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="c-contenido">Contenido</label>
                <textarea
                  id="c-contenido"
                  name="contenido"
                  rows="4"
                  placeholder="Redacta el comunicado..."
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="c-dest">Destinatarios</label>
                <select id="c-dest" name="destinatarios" required>
                  <option value="todos">Todos</option>
                  <option value="docentes">Solo docentes</option>
                  <option value="estudiantes">Solo estudiantes</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Publicar Circular
              </button>
            </form>
          </section>
        </Reveal>

        <Reveal delay={150}>
          <section className="panel">
            <h3>🗞️ Circulares publicadas</h3>
            {circulars.length === 0 ? (
              <p className="empty-state">No hay circulares publicadas.</p>
            ) : (
              <div className="circular-list">
                {circulars.map((c) => (
                  <article key={c.id} className="circular-item row-enter">
                    <div className="circular-head">
                      <h4>{c.titulo}</h4>
                      <span className="badge">{c.fecha}</span>
                    </div>
                    <p>{c.contenido}</p>
                    <span className="circular-audience">Para: {c.destinatarios}</span>
                  </article>
                ))}
              </div>
            )}
          </section>
        </Reveal>
      </div>
    </div>
  );
};

export default CircularsPanel;