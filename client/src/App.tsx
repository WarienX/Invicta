import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { ClientsPage, Dashboard, RolesPage } from './pages';

export default function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
