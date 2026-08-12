const LoadingSpinner = ({ text = 'Cargando...' }) => (
  <div className="spinner-screen">
    <div className="spinner" role="status" aria-label="Cargando" />
    <p>{text}</p>
  </div>
);

export default LoadingSpinner;