import { useState } from 'react';
import Reveal from '../common/Reveal';
import ReservationForm from './ReservationForm';

const ReservationsPanel = () => {
  const [aulaId, setAulaId] = useState(1);
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState('');

  const aulas = [
    { id: 1, nombre: 'Laboratorio de Cómputo A', capacidad: 24 },
    { id: 2, nombre: 'Aula de Audiovisuales', capacidad: 35 },
    { id: 3, nombre: 'Biblioteca Central', capacidad: 40 },
  ];

  const handleSuccess = (res) => {
    const aula = aulas.find((a) => a.id === aulaId);
    setReservations((prev) => [
      {
        id: Date.now(),
        aula: aula?.nombre,
        estado: 'confirmada',
        hora: '08:50 - 10:30',
        fecha: new Date().toLocaleDateString('es-CR'),
      },
      ...prev,
    ]);
    setMessage('✅ Reserva exitosa. Bloqueo optimista confirmado sin colisiones.');
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className="dashboard">
      <Reveal>
        <header className="section-head">
          <h1 className="page-title">Reserva de Espacios</h1>
          <p className="page-subtitle">
            Control de concurrencia: dos usuarios no pueden reservar el mismo espacio.
          </p>
        </header>
      </Reveal>

      {message && <div className="toast inline-toast success">{message}</div>}

      <div className="two-col">
        <Reveal>
          <section className="panel">
            <h3>🏫 Selecciona un recurso</h3>
            <div className="aula-grid">
              {aulas.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={`aula-card ${aulaId === a.id ? 'active' : ''}`}
                  onClick={() => setAulaId(a.id)}
                >
                  <span className="aula-icon">🛋️</span>
                  <strong>{a.nombre}</strong>
                  <small>Capacidad: {a.capacidad}</small>
                </button>
              ))}
            </div>
            <ReservationForm aulaId={aulaId} onSuccess={handleSuccess} />
          </section>
        </Reveal>

        <Reveal delay={150}>
          <section className="panel">
            <h3>📅 Reservas activas</h3>
            {reservations.length === 0 ? (
              <p className="empty-state">No hay reservas activas.</p>
            ) : (
              <div className="circular-list">
                {reservations.map((r) => (
                  <article key={r.id} className="circular-item row-enter">
                    <div className="circular-head">
                      <h4>{r.aula}</h4>
                      <span className="badge badge-success">{r.estado}</span>
                    </div>
                    <p>
                      📅 {r.fecha} · ⏰ {r.hora}
                    </p>
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

export default ReservationsPanel;