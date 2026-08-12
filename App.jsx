import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import LoginPage from './pages/LoginPage';
import StaffDashboardPage from './pages/StaffDashboardPage';
import StudentDashboardPage from './pages/StudentDashboardPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/staff/*" element={
            <PrivateRoute roles={['staff']}>
              <StaffDashboardPage />
            </PrivateRoute>
          } />
          <Route path="/student/*" element={
            <PrivateRoute roles={['estudiante', 'familiar']}>
              <StudentDashboardPage />
            </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}