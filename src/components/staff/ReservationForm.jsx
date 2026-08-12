import { useState } from 'react';
import api from '../../api';
import { demoDb } from '../../db/demoDb';

const ReservationForm = ({ aulaId, onSuccess }) => {
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Control de concurrencia: rechaza colisiones en la base de datos demo.
      if (demoDb.hasConflict(aulaId, fecha, horaInicio, horaFin)) {
        setError('Conflicto: otro usuario reservó este horario. Intenta nuevamente.');
        setLoading(false);
        return;
      }

      let guardadoDemo = true;
      try {
        // Intenta persistir en el backend real.
        await api.post('/room-reservations', {
          aula_id: aulaId,
          fecha,
          hora_inicio: horaInicio,
          hora_fin: horaFin,
        });
        guardadoDemo = false;
      } catch (err) {
        if (err.response?.status === 409) {
          setError('Conflicto: otro usuario reservó este horario. Intenta nuevamente.');
          setLoading(false);
          return;
        }
        // Error de red o backend no disponible: se respalda en la base demo.
      }

      // Guarda el registro en la base de datos demo (persistente).
      const saved = demoDb.insert('reservations', {
        aula_id: aulaId,
        fecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        estado: 'confirmada',
        guardadoDemo,
      });
      onSuccess(saved);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <div className="form-group">
        <label htmlFor="r-fecha">Fecha</label>
        <input
          id="r-fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="r-inicio">Hora inicio</label>
          <input
            id="r-inicio"
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="r-fin">Hora fin</label>
          <input
            id="r-fin"
            type="time"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
            required
          />
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
        {loading ? 'Reservando...' : 'Reservar Espacio'}
      </button>
    </form>
  );
};

export default ReservationForm;