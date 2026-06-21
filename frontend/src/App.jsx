import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Registro from './pages/Registro';
import AdminDashboard from './pages/AdminDashboard';
import AdminRegistro from './pages/AdminRegistro';
import AdminEditarUsuario from './pages/AdminEditarUsuario'; 

const Home = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h1>🏠 Home Pública (Mundial 2026)</h1>
    <p>Sección libre. Usá la barra de navegación de arriba para interactuar.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* rutas publicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          
          {/* rutas privadas, solo para admin */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* NUEVA RUTA PROTEGIDA PARA EL FORMULARIO DE ADMIN */}
            <Route path="/admin/nuevo-usuario" element={<AdminRegistro />} />
            
            {/* NUEVA RUTA DINÁMICA PROTEGIDA PARA EDITAR POR ID */}
            <Route path="/admin/editar-usuario/:id" element={<AdminEditarUsuario />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;