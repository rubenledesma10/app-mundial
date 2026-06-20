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

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1e1e2f' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
                    🏆 Sistema Gestión de Jugadores y Usuarios
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {/* Botón siempre visible */}
                    <Button color="inherit" component={Link} to="/">Home</Button>

                    {/* 👤 CASO 1: NO LOGUEADO */}
                    {!token && (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button variant="outlined" color="inherit" component={Link} to="/register">Registro</Button>
                        </>
                    )}

                    {/* 👑 CASO 2: LOGUEADO COMO ADMIN */}
                    {token && user?.rol === 'admin' && (
                        <>
                            <Button color="warning" variant="contained" component={Link} to="/admin" sx={{ fontWeight: 'bold' }}>
                                CRUD Usuarios
                            </Button>
                            <Button color="error" variant="outlined" onClick={handleLogout}>Cerrar Sesión</Button>
                        </>
                    )}

                    {/* 🏃‍♂️ CASO 3: LOGUEADO COMO USER COMÚN */}
                    {token && user?.rol === 'user' && (
                        <>
                            <Button color="success" variant="contained" disabled sx={{ color: '#fff !important' }}>Estadísticas</Button>
                            <Button color="inherit">Mis Datos</Button>
                            <Button color="error" variant="outlined" onClick={handleLogout}>Cerrar Sesión</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;