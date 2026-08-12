import { Link } from 'react-router-dom';

const UnauthorizedPage = () => (
  <div className="center-page page-transition">
    <div className="big-icon">🔒</div>
    <h1>Acceso Denegado</h1>
    <p>No tienes permisos para acceder a esta sección.</p>
    <Link to="/" className="btn btn-primary">
      Volver al inicio
    </Link>
  </div>
);

export default UnauthorizedPage;