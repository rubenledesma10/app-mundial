import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
// 📦 Componentes de Material UI para armar un panel profesional
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Alert,
    CircularProgress,
    AppBar,
    Toolbar
} from '@mui/material';

const AdminDashboard = () => {
    const { token, logout } = useAuth();
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 🔍 Lógica del Buscador en tiempo real con Debounce
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim() === '') {
                setUsers([]);
                return;
            }

            const fetchUsers = async () => {
                try {
                    setLoading(true);
                    setError('');

                    const response = await axios.get(`http://localhost:5000/api/users/search?q=${query}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    setUsers(response.data.users);
                } catch (err) {
                    setError('Error al buscar usuarios o sesión expirada.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchUsers();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, token]);

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            {/* 🗺️ NAVBAR DEL PANEL DE CONTROL */}
            <AppBar position="static" color="primary">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        👑 Panel de Control (Admin)
                    </Typography>
                    <Button color="inherit" onClick={logout} sx={{ fontWeight: 'bold', border: '1px solid white' }}>
                        Cerrar Sesión
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
                        👥 Gestión de Usuarios (CRUD)
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
                        [Espacio de integración] Acá se conectarán las funciones para Crear, Editar y Eliminar los registros de la base de datos.
                    </Typography>
                    {/* Botón de muestra estético */}
                    <Button variant="contained" color="success" disabled>
                        + Agregar Nuevo Usuario
                    </Button>
                </Paper>

                {/* 🔍 SECCIÓN: TU BUSCADOR EN TIEMPO REAL DE USUARIOS */}
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
                        🕵️‍♂️ Buscador de Usuarios en Tiempo Real
                    </Typography>

                    <TextField
                        fullWidth
                        label="Buscar por DNI, Nombre, Apellido o Email..."
                        variant="outlined"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        sx={{ mb: 3, backgroundColor: '#fff' }}
                    />

                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    {/* 📊 TABLA ESTILIZADA CON MATERIAL UI */}
                    {!loading && users.length > 0 && (
                        <TableContainer component={Paper} variant="outlined">
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead sx={{ backgroundColor: '#eee' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Nombre Completo</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>DNI</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((u) => (
                                        <TableRow key={u.id} hover>
                                            <TableCell>{u.id}</TableCell>
                                            <TableCell>{u.first_name} {u.last_name}</TableCell>
                                            <TableCell>{u.dni}</TableCell>
                                            <TableCell>{u.email}</TableCell>
                                            <TableCell>
                                                <Box component="span" sx={{
                                                    px: 1.5, py: 0.5, borderRadius: 1, fontSize: '12px', fontWeight: 'bold',
                                                    backgroundColor: u.rol === 'admin' ? '#e3f2fd' : '#fff3e0',
                                                    color: u.rol === 'admin' ? '#0d47a1' : '#e65100'
                                                }}>
                                                    {u.rol}
                                                </Box>
                                            </TableCell>
                                            <TableCell>{u.is_active ? '🟢 Activo' : '🔴 Inactivo'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    {!loading && query.trim() !== '' && users.length === 0 && (
                        <Typography variant="body1" sx={{ color: '#777', fontStyle: 'italic', mt: 2 }}>
                            No se encontraron usuarios que coincidan con "{query}".
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default AdminDashboard;