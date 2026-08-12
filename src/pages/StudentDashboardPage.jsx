import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import StudentHome from '../components/student/StudentHome';
import StudentGrades from '../components/student/StudentGrades';
import StudentSchedule from '../components/student/StudentSchedule';
import StudentMaterials from '../components/student/StudentMaterials';
import StudentCirculars from '../components/student/StudentCirculars';

const StudentDashboardPage = () => (
  <Layout>
    <Routes>
      <Route index element={<StudentHome />} />
      <Route path="grades" element={<StudentGrades />} />
      <Route path="schedule" element={<StudentSchedule />} />
      <Route path="materials" element={<StudentMaterials />} />
      <Route path="circulars" element={<StudentCirculars />} />
      <Route path="*" element={<Navigate to="/student" replace />} />
    </Routes>
  </Layout>
);

export default StudentDashboardPage;