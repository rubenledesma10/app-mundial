import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
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
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Registro = ({ isAdminView = false }) => {
    const { token } = useAuth();
    const [formData, setFormData] = useState({ 
        first_name: '', 
        last_name: '', 
        dni: '', 
        email: '', 
        password: '',
        birthdate: '',
        rol: 'user' 
    });
    
    // Estados multimedia
    const [previewUrl, setPreviewUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const videoRef = useRef(null);
    const [usingCamera, setUsingCamera] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Selector de archivos de la PC
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    // Encender webcam
    const startCamera = async () => {
        setUsingCamera(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
            console.error(err);
            alert("No se pudo acceder a la cámara.");
            setUsingCamera(false);
        }
    };

    // Capturar foto y pasarla a binario físico (Blob)
    const capturePhoto = () => {
        const video = videoRef.current;
        if (!video) return;

        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            if (blob) {
                const fileFromCamera = new File([blob], "camera_register.jpg", { type: "image/jpeg" });
                setSelectedFile(fileFromCamera);
                setPreviewUrl(URL.createObjectURL(fileFromCamera));
            }
        }, 'image/jpeg', 0.9);

        const stream = video.srcObject;
        if (stream) stream.getTracks().forEach(track => track.stop());
        setUsingCamera(false);
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

            // Construimos FormData para soportar la foto física
            const formToSend = new FormData();
            formToSend.append('first_name', formData.first_name);
            formToSend.append('last_name', formData.last_name);
            formToSend.append('dni', formData.dni);
            formToSend.append('email', formData.email);
            formToSend.append('password', formData.password);
            formToSend.append('birthdate', formData.birthdate);
            formToSend.append('rol', formData.rol);

            if (selectedFile) {
                formToSend.append('photo', selectedFile);
            }

            //  CLAVE: Si es admin usa el CRUD (/api/users/), si es público usa auth (/api/auth/register)
            const endpoint = isAdminView 
                ? 'http://localhost:5000/api/users/' 
                : 'http://localhost:5000/api/auth/register';

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            if (isAdminView && token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            await axios.post(endpoint, formToSend, config);
            
            setSuccess(isAdminView ? '¡Usuario creado con éxito por el Administrador!' : '¡Registro exitoso! Redirigiendo...');
            
            if (!isAdminView) {
                setTimeout(() => navigate('/login'), 2000);
            } else {
                // Reset del formulario si es administrador
                setFormData({ first_name: '', last_name: '', dni: '', email: '', password: '', birthdate: '', rol: 'user' });
                setPreviewUrl('');
                setSelectedFile(null);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al procesar el registro');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: isAdminView ? 2 : 4, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: isAdminView ? 0 : 4, boxShadow: isAdminView ? 0 : 3, borderRadius: 2, backgroundColor: '#fff' }}>
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

                    {/*  MÓDULO MULTIMEDIA INTEGRADO */}
                    <Box sx={{ border: '1px dashed #b5b5b5', p: 2, borderRadius: 2, textAlign: 'center', mt: 2, mb: 1, backgroundColor: '#fafafa' }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#555' }}>📸 Foto de Perfil</Typography>
                        {previewUrl && !usingCamera && <Box component="img" src={previewUrl} sx={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', mb: 1, border: '3px solid #1976d2' }} />}
                        {usingCamera && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
                                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: 240, borderRadius: 8, transform: 'scaleX(-1)', border: '2px solid #ccc' }} />
                                <Button variant="contained" color="secondary" size="small" startIcon={<PhotoCameraIcon />} onClick={capturePhoto} sx={{ mt: 1, fontWeight: 'bold' }}>Tomar Foto</Button>
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Button component="label" variant="outlined" size="small" startIcon={<UploadFileIcon />}>Subir<input type="file" accept="image/*" hidden onChange={handleFileChange} /></Button>
                            {!usingCamera && <Button variant="outlined" size="small" startIcon={<PhotoCameraIcon />} color="warning" onClick={startCamera}>Cámara</Button>}
                        </Box>
                    </Box>

                    {/* DESPLEGABLE EXCLUSIVO DE ADMINISTRADOR */}
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