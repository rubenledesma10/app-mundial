import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth'; // 👈 Importamos por si necesitamos el token
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Alert, 
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const Registro = ({ isAdminView = false }) => { // 👈 Recibe si es vista de Admin o no
    const { token } = useAuth();
    const [formData, setFormData] = useState({ 
        first_name: '', 
        last_name: '', 
        dni: '', 
        email: '', 
        password: '',
        birthdate: '',
        rol: 'user' // 👈 Rol por defecto
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.email.trim() || !formData.password.trim() || !formData.dni.trim() || !formData.birthdate) {
            setError('Por favor, completa los campos obligatorios.');
            return;
        }

        try {
            setLoading(true);
            
            // Si es vista de admin, le mandamos el Token en la cabecera por seguridad
            const config = isAdminView && token ? { headers: { Authorization: `Bearer ${token}` } } : {};

            await axios.post('http://localhost:5000/api/auth/register', formData, config);
            
            setSuccess(isAdminView ? '¡Usuario creado con éxito por el Administrador!' : '¡Registro exitoso! Redirigiendo...');
            
            if (!isAdminView) {
                setTimeout(() => navigate('/login'), 2000);
            } else {
                // Si es admin, limpiamos el formulario para que pueda crear otro seguido
                setFormData({ first_name: '', last_name: '', dni: '', email: '', password: '', birthdate: '', rol: 'user' });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al procesar el registro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: isAdminView ? 2 : 4, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4, boxShadow: isAdminView ? 0 : 3, borderRadius: 2, backgroundColor: '#fff' }}>
                <Typography component="h1" variant="h5" sx={{ color: '#1976d2', mb: 2, fontWeight: 'bold' }}>
                    {isAdminView ? '👥 Registrar Nuevo Usuario (Admin)' : '📝 Crear Cuenta'}
                </Typography>
                
                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{success}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField margin="normal" fullWidth label="Nombre" name="first_name" value={formData.first_name} onChange={handleChange} />
                    <TextField margin="normal" fullWidth label="Apellido" name="last_name" value={formData.last_name} onChange={handleChange} />
                    <TextField margin="normal" required fullWidth label="DNI" name="dni" value={formData.dni} onChange={handleChange} />
                    
                    <Typography variant="body2" sx={{ mt: 2, color: '#666', textAlign: 'left', width: '100%' }}>
                        Fecha de Nacimiento *
                    </Typography>
                    <TextField margin="dense" required fullWidth type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />

                    {/* 👑 DESPLEGABLE EXCLUSIVO DE ADMINISTRADOR */}
                    {isAdminView && (
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel id="rol-select-label">Rol del Usuario</InputLabel>
                            <Select
                                labelId="rol-select-label"
                                name="rol"
                                value={formData.rol}
                                label="Rol del Usuario"
                                onChange={handleChange}
                            >
                                <MenuItem value="user">User (Usuario Común)</MenuItem>
                                <MenuItem value="admin">Admin (Administrador)</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    <TextField margin="normal" required fullWidth label="Correo Electrónico" type="email" name="email" value={formData.email} onChange={handleChange} />
                    <TextField margin="normal" required fullWidth label="Contraseña" type="password" name="password" value={formData.password} onChange={handleChange} />
                    
                    <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2, padding: '12px', fontWeight: 'bold' }}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : isAdminView ? 'Crear Usuario' : 'Registrarse'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Registro;