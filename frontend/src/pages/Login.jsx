import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
// 📦 Importamos los componentes estéticos de Material UI
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Alert, 
  CircularProgress 
} from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/auth/login', { //apunta al endponint del back para iniciar sesion
                email: email,
                password: password
            });

            const { token, user } = response.data;
            
            // Guardamos en el cerebro de la app
            login(token, user); //guardamos la informacion
            
            navigate('/admin', { replace: true }); //podemos acceder

        } catch (err) { //capturamos el erro del back
            const msgError = err.response?.data?.message || 'Error al conectar con el servidor';
            setError(msgError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box 
                sx={{ 
                    marginTop: 8, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    padding: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#fff' // Contenedor blanco estético
                }}
            >
                <Typography component="h1" variant="h5" sx={{ color: '#1976d2', mb: 2, fontWeight: 'bold' }}>
                    🔐 Iniciar Sesión
                </Typography>
                
                {/* Alerta de error de Material UI */}
                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Correo Electrónico"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, padding: '12px', fontWeight: 'bold', fontSize: '16px' }}
                    >
                        {/* Si está cargando, muestra un rulo de carga animado */}
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;