import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Variable auxiliar para no repetir la lógica condicional del ruteo del Home
  const homeRedirectRoute = !token ? '/' : user?.rol === 'admin' ? '/admin-home' : '/home';

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e1e2f' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* TÍTULO DEL SISTEMA (Con la misma lógica de redirección que el botón Home) */}
        <Typography
          variant="h6"
          component={Link}
          to={homeRedirectRoute}
          sx={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}
        >
          🏆 Sistema Gestión de Jugadores y Usuarios
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          
          

          {/* Botón Home (Siempre visible, ruteo dinámico) */}
          <Button
            color="inherit"
            component={Link}
            to={homeRedirectRoute}
          >
            Home
          </Button>

          {/* CASO: USUARIO NO LOGUEADO */}
          {!token && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/register"
              >
                Registro
              </Button>
            </>
          )}

          {/* CASO: LOGUEADO COMO ADMINISTRADOR */}
          {token && user?.rol === 'admin' && (
            <>
              <Button color="inherit" component={Link} to="/admin">
                CRUD Usuarios
              </Button>
              <Button color="error" variant="outlined" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          )}

          {/* CASO: LOGUEADO COMO USUARIO COMÚN */}
          {token && user?.rol === 'user' && (
            <>
              <Button color="inherit" component={Link} to="/estadisticas">
                ESTADÍSTICAS
              </Button>
              <Button color="inherit" component={Link} to="/perfil">
                MIS DATOS
              </Button>
              <Button color="error" variant="outlined" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          )}
          {/* Saludo personalizado usando el método polimórfico del Backend si inició sesión */}
          {token && user?.full_name && (
            <Typography variant="body2" sx={{ color: '#ccc', mr: 1, fontStyle: 'italic' }}>
              Hola, {user.full_name}
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;