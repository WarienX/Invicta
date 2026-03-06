import './App.css'
import Dashboard from './pages/Dashboard';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

export default function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
