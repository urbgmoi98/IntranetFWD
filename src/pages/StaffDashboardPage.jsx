import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import DashboardStaff from '../components/DashboardStaff';
import GradesPanel from '../components/staff/GradesPanel';
import AttendancePanel from '../components/staff/AttendancePanel';
import CircularsPanel from '../components/staff/CircularsPanel';
import ReservationsPanel from '../components/staff/ReservationsPanel';

const StaffDashboardPage = () => (
  <Layout>
    <Routes>
      <Route index element={<DashboardStaff />} />
      <Route path="grades" element={<GradesPanel />} />
      <Route path="attendance" element={<AttendancePanel />} />
      <Route path="circulars" element={<CircularsPanel />} />
      <Route path="reservations" element={<ReservationsPanel />} />
      <Route path="*" element={<Navigate to="/staff" replace />} />
    </Routes>
  </Layout>
);

export default StaffDashboardPage;