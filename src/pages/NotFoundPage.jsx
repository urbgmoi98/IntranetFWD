import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="center-page page-transition">
    <div className="big-icon">🧭</div>
    <h1>404</h1>
    <p>La página que buscas no existe o fue movida.</p>
    <Link to="/" className="btn btn-primary">
      Volver al inicio
    </Link>
  </div>
);

export default NotFoundPage;