import { useState } from 'react';
import Reveal from '../common/Reveal';

const materials = [
  { titulo: 'Guía de Arquitectura REST API', tipo: 'PDF', materia: 'Backend', peso: '2.1 MB' },
  { titulo: 'Instrucciones del Proyecto Final', tipo: 'DOCX', materia: 'Proyecto', peso: '850 KB' },
  { titulo: 'Slides - Diseño de Interfaces', tipo: 'PPTX', materia: 'Diseño', peso: '4.3 MB' },
  { titulo: 'Práctica SQL - Consultas Avanzadas', tipo: 'PDF', materia: 'Bases de Datos', peso: '1.2 MB' },
];

const StudentMaterials = () => {
  const [message, setMessage] = useState('');

  const handleDownload = (titulo) => {
    setMessage(`⬇️ Descargando de forma segura: ${titulo}`);
    setTimeout(() => setMessage(''), 3500);
  };

  return (
    <div className="dashboard">
      <Reveal>
        <header className="section-head">
          <h1 className="page-title">Material de Apoyo</h1>
          <p className="page-subtitle">Tareas, guías y material didáctico para descargar.</p>
        </header>
      </Reveal>

      {message && <div className="toast inline-toast">{message}</div>}

      <Reveal delay={120}>
        <section className="panel">
          <h3>📚 Recursos disponibles</h3>
          {materials.length === 0 ? (
            <p className="empty-state">No hay material disponible.</p>
          ) : (
            <div className="file-list">
              {materials.map((m, i) => (
                <div key={i} className="file-item row-enter">
                  <div className="file-icon">📄</div>
                  <div className="file-meta">
                    <strong>{m.titulo}</strong>
                    <small>
                      {m.materia} · {m.tipo} · {m.peso}
                    </small>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleDownload(m.titulo)}
                  >
                    ⬇️ Descargar
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </Reveal>
    </div>
  );
};

export default StudentMaterials;