import { useState } from 'react';
import Reveal from '../common/Reveal';
import ReservationForm from './ReservationForm';
import { demoDb } from '../../db/demoDb';

const ReservationsPanel = () => {
  const [aulaId, setAulaId] = useState(1);
  const [reservations, setReservations] = useState(() =>
    demoDb.get('reservations')
  );
  const [message, setMessage] = useState('');

  const aulas = [
    { id: 1, nombre: 'Laboratorio de Cómputo A', capacidad: 24 },
    { id: 2, nombre: 'Aula de Audiovisuales', capacidad: 35 },
    { id: 3, nombre: 'Biblioteca Central', capacidad: 40 },
  ];

  const handleSuccess = (saved) => {
    setReservations(demoDb.get('reservations'));
    setMessage(
      saved?.guardadoDemo
        ? '✅ Reserva registrada en la base de datos demo (backend no disponible).'
        : '✅ Reserva exitosa. Bloqueo optimista confirmado sin colisiones.'
    );
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
                {reservations.map((r) => {
                  const aula = aulas.find((a) => a.id === r.aula_id);
                  return (
                    <article key={r.id} className="circular-item row-enter">
                      <div className="circular-head">
                        <h4>{aula?.nombre || `Espacio #${r.aula_id}`}</h4>
                        <span className="badge badge-success">
                          {r.estado || 'confirmada'}
                        </span>
                      </div>
                      <p>
                        📅 {r.fecha} · ⏰ {r.hora_inicio} - {r.hora_fin}
                      </p>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </Reveal>
      </div>
    </div>
  );
};

export default ReservationsPanel;