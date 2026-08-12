import { useState } from 'react';
import api from '../api';

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
      await api.post('/room-reservations', { aula_id: aulaId, fecha, hora_inicio: horaInicio, hora_fin: horaFin });
      onSuccess();
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Conflicto: otro usuario reservó este horario. Por favor, recarga.');
      } else {
        setError(err.response?.data?.message || 'Error al reservar');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <div className="form-group">
        <label>Fecha</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Hora inicio</label>
        <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Hora fin</label>
        <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={loading}>Reservar</button>
    </form>
  );
};