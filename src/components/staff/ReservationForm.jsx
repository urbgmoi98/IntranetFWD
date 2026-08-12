import { useState } from 'react';
import api from '../../api';

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
      await api.post('/room-reservations', {
        aula_id: aulaId,
        fecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
      });
      onSuccess();
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Conflicto: otro usuario reservó este horario. Intenta nuevamente.');
      } else {
        setError(err.response?.data?.message || 'Error al reservar.');
      }
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