import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import {
    Container,
    Box,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Alert,
    CircularProgress,
    Button,
    IconButton,
    Tooltip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminDashboard = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Estados para los selectores de filtrado y ordenamiento
    const [statusFilter, setStatusFilter] = useState('all');
    const [alphabeticalOrder, setAlphabeticalOrder] = useState('none');

    // 🔍 1. Petición al Backend (Carga inicial de todos + Buscador en tiempo real)
    useEffect(() => {
        // 🟢 CASO A: Si la barra está vacía, traemos TODOS de entrada sin esperar debounce
        if (query.trim() === '') {
            const fetchAllUsers = async () => {
                try {
                    setLoading(true);
                    setError('');
                    const response = await axios.get(`http://localhost:5000/api/users/search?q=`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUsers(response.data.users);
                } catch (err) {
                    setError('Error al cargar la lista completa de usuarios.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchAllUsers();
            return;
        }

        // 🟢 CASO B: Si el usuario escribe, metemos Debounce de 300ms para no ahogar a Flask
        const delayDebounceFn = setTimeout(() => {
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

    // 🟢 2. CÁLCULO EN TIEMPO REAL DURANTE EL RENDER (Filtros aplicados al Frontend)
    let filteredUsers = users.filter(u => u && typeof u === 'object');

    // A) Filtrado por estado (Maneja booleanos reales o strings "true"/"false")
    if (statusFilter === 'active') {
        filteredUsers = filteredUsers.filter(u => u.is_active === true || String(u.is_active) === 'true');
    } else if (statusFilter === 'inactive') {
        filteredUsers = filteredUsers.filter(u => u.is_active === false || String(u.is_active) === 'false');
    }

    // B) Ordenamiento alfabético creando una copia nueva para forzar a React a redibujar
    if (alphabeticalOrder === 'asc') {
        filteredUsers = [...filteredUsers].sort((a, b) => {
            const nameA = `${a?.last_name || ''} ${a?.first_name || ''}`.toLowerCase().trim();
            const nameB = `${b?.last_name || ''} ${b?.first_name || ''}`.toLowerCase().trim();
            return nameA.localeCompare(nameB, 'es', { sensitivity: 'base' });
        });
    } else if (alphabeticalOrder === 'desc') {
        filteredUsers = [...filteredUsers].sort((a, b) => {
            const nameA = `${a?.last_name || ''} ${a?.first_name || ''}`.toLowerCase().trim();
            const nameB = `${b?.last_name || ''} ${b?.first_name || ''}`.toLowerCase().trim();
            return nameB.localeCompare(nameA, 'es', { sensitivity: 'base' });
        });
    }

    // 🟢 Navegación al componente de edición pasando el ID dinámico
    const handleEditar = (userId) => {
        navigate(`/admin/editar-usuario/${userId}`);
    };

    // 🟢 Toggle de activación/desactivación apuntando al endpoint de Flask
    const handleEliminar = async (userId, currentStatus) => {
        const accion = currentStatus ? 'desactivar' : 'activar';

        if (window.confirm(`¿Estás seguro de que querés ${accion} a este usuario?`)) {
            try {
                setLoading(true);
                setError('');

                // Le pegamos al endpoint exclusivo que creamos en Flask
                await axios.put(`http://localhost:5000/api/users/${userId}/toggle`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Cambiamos el estado local instantáneamente en la tabla
                setUsers(prevUsers =>
                    prevUsers.map(u => u.id === userId ? { ...u, is_active: !currentStatus } : u)
                );

                alert(`Usuario ${accion}ado con éxito.`);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || 'No se pudo cambiar el estado.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh', pt: 4 }}>
            <Container maxWidth="lg">

                {/* ENCABEZADO Y BOTÓN DE ALTA */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e1e2f' }}>
                        👥 Panel de Gestión de Usuarios
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        onClick={() => navigate('/admin/nuevo-usuario')}
                        sx={{ fontWeight: 'bold' }}
                    >
                        + Agregar Nuevo Usuario
                    </Button>
                </Box>

                {/* BUSCADOR Y FILTROS */}
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
                        🕵️‍♂️ Buscador y Filtros Avanzados
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Buscar por DNI, Nombre, Apellido o Email..."
                                variant="outlined"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                sx={{ backgroundColor: '#fff' }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth sx={{ backgroundColor: '#fff' }}>
                                <InputLabel id="status-filter-label">Filtrar por Estado</InputLabel>
                                <Select
                                    labelId="status-filter-label"
                                    value={statusFilter}
                                    label="Filtrar por Estado"
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Todos los estados</MenuItem>
                                    <MenuItem value="active">🟢 Solo Activos</MenuItem>
                                    <MenuItem value="inactive">🔴 Solo Inactivos</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth sx={{ backgroundColor: '#fff' }}>
                                <InputLabel id="order-filter-label">Orden Alfabético</InputLabel>
                                <Select
                                    labelId="order-filter-label"
                                    value={alphabeticalOrder}
                                    label="Orden Alfabético"
                                    onChange={(e) => setAlphabeticalOrder(e.target.value)}
                                >
                                    <MenuItem value="none">Sin orden específico</MenuItem>
                                    <MenuItem value="asc">A - Z (Ascendente)</MenuItem>
                                    <MenuItem value="desc">Z - A (Descendente)</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    {/* TABLA DINÁMICA CON LAS CORRECCIONES DE ATRIBUTOS */}
                    {!loading && filteredUsers.length > 0 && (
                        <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead sx={{ backgroundColor: '#eee' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Nombre Completo</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>DNI</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredUsers.map((u) => (
                                        <TableRow key={u.id} hover>
                                            <TableCell>{u.id}</TableCell>
                                            <TableCell>{u?.last_name || ''}, {u?.first_name || ''}</TableCell>
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
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                                    <Tooltip title="Editar Usuario">
                                                        <IconButton color="primary" onClick={() => handleEditar(u.id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Eliminar Usuario">
                                                        <IconButton color="error" onClick={() => handleEliminar(u.id, u.is_active)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    {!loading && filteredUsers.length === 0 && (
                        <Typography variant="body1" sx={{ color: '#777', fontStyle: 'italic', mt: 3, textAlign: 'center' }}>
                            {query.trim() === '' ? "No hay usuarios registrados en el sistema." : `No hay usuarios que coincidan con los filtros aplicados para "${query}".`}
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default AdminDashboard;