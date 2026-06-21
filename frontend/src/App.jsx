import Players from './pages/Players';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Registro from './pages/Registro';
import AdminDashboard from './pages/AdminDashboard';
import AdminRegistro from './pages/AdminRegistro';
import AdminEditarUsuario from './pages/AdminEditarUsuario';
import StatisticsPage from './pages/StatisticsPage';
import ProfilePage from './pages/ProfilePage';

import HomeAdmin from './pages/HomeAdmin';
import HomePublic from './pages/HomePublic';
import HomePrivate from './pages/HomePrivate';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* rutas publicas */}
          <Route path="/players" element={<Players />} />
          <Route path="/" element={<HomePublic />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/estadisticas" element={<StatisticsPage />} />
          <Route path="/perfil" element={<ProfilePage />} />

          {/* Privadas para cualquier usuario autenticado */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePrivate />} />
          </Route>

          {/* rutas privadas, solo para admin */}
          <Route path="/admin-home" element={<HomeAdmin />} />
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />

            {/* NUEVA RUTA PROTEGIDA PARA EL FORMULARIO DE ADMIN */}
            <Route path="/admin/nuevo-usuario" element={<AdminRegistro />} />

            {/* NUEVA RUTA DINÁMICA PROTEGIDA PARA EDITAR POR ID */}
            <Route
              path="/admin/editar-usuario/:id"
              element={<AdminEditarUsuario />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
