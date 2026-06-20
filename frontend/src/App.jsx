import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext'; // 👈 1. IMPORTAMOS TU CONTEXTO REFORMADO
import Login from './pages/Login';
// Componentes temporales para probar que las rutas funcionen
const Home = () => <div style={{ padding: '20px' }}><h1>🏠 Home Pública (Mundial 2026)</h1><p>Acá cualquiera puede ver fixture o jugadores.</p></div>;

const AdminDashboard = () => <div style={{ padding: '20px' }}><h1>👑 Panel de Administración (Solo Admin)</h1><p>¡Acá va a ir tu ABM de Jugadores y el buscador en tiempo real!</p></div>;

function App() {
  return (
    <AuthProvider> {/* 🔐 2. ENVOLVEMOS TODA LA APP CON EL PROVEEDOR */}
      <BrowserRouter>
        {/* barra de navegacion simple para movernos entre URLs por ahora */}
        <nav style={{ padding: '10px', background: '#eee', display: 'flex', gap: '15px' }}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/admin">Panel Admin (Protegido)</Link>
        </nav>

        <Routes>
          {/* rutas publicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/*rutas piravads, solo para admin */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;