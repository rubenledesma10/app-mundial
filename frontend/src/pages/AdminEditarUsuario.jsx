import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import {
    Container, Box, Typography, TextField, Button,
    FormControl, InputLabel, Select, MenuItem, Paper, CircularProgress, Alert
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SaveIcon from '@mui/icons-material/Save';

const AdminEditarUsuario = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        first_name: '', last_name: '', dni: '', email: '', rol: '', birthdate: ''
    });
    const [previewUrl, setPreviewUrl] = useState(''); 
    const [selectedFile, setSelectedFile] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const videoRef = useRef(null);
    const [usingCamera, setUsingCamera] = useState(false);

    // Carga inicial por ID
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const user = response.data.user; 
                if (user) {
                    setFormData({
                        first_name: user.first_name || '',
                        last_name: user.last_name || '',
                        dni: user.dni || '',
                        email: user.email || '',
                        rol: user.rol || 'user',
                        birthdate: user.birthdate || ''
                    });
                    if (user.photo) {
                        // Si guardamos la ruta relativa, le pegamos al servidor local de Flask para mostrarla
                        setPreviewUrl(`http://localhost:5000/${user.photo}`);
                    }
                }
            } catch (err) {
                setError('Error al cargar los datos del usuario.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id, token]);

    // Selector de archivos de la PC
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file); 
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

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
                const fileFromCamera = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });
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
        try {
            setLoading(true);
            setError('');

            const formToSend = new FormData();
            formToSend.append('first_name', formData.first_name);
            formToSend.append('last_name', formData.last_name);
            formToSend.append('dni', formData.dni);
            formToSend.append('email', formData.email);
            formToSend.append('rol', formData.rol);
            formToSend.append('birthdate', formData.birthdate);
            
            // Si el usuario seleccionó o se sacó una foto nueva, la adjuntamos como archivo real
            if (selectedFile) {
                formToSend.append('photo', selectedFile);
            }

            await axios.put(`http://localhost:5000/api/users/${id}`, formToSend, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' 
                }
            });

            alert("Usuario actualizado con éxito.");
            navigate('/admin'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Error al actualizar el usuario.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !formData.email) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Button variant="outlined" onClick={() => navigate('/admin')} sx={{ mb: 2, fontWeight: 'bold' }}>← Cancelar y Volver</Button>
            <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>📝 Editar Usuario N° {id}</Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Nombre" fullWidth value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} required />
                    <TextField label="Apellido" fullWidth value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} required />
                    <TextField label="DNI" fullWidth value={formData.dni} onChange={(e) => setFormData({ ...formData, dni: e.target.value })} required />
                    <TextField label="Email" type="email" fullWidth value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <TextField label="Fecha de Nacimiento" type="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.birthdate} onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })} />
                    <FormControl fullWidth required>
                        <InputLabel id="edit-rol-label">Rol</InputLabel>
                        <Select labelId="edit-rol-label" value={formData.rol} label="Rol" onChange={(e) => setFormData({ ...formData, rol: e.target.value })}>
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ border: '1px dashed #b5b5b5', p: 3, borderRadius: 2, textAlign: 'center', mt: 1, backgroundColor: '#fafafa' }}>
                        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold', color: '#555' }}>👤 Foto de Perfil / Identificación</Typography>
                        {previewUrl && !usingCamera && <Box component="img" src={previewUrl} sx={{ width: 130, height: 130, borderRadius: '50%', objectFit: 'cover', mb: 2, border: '3px solid #1976d2', boxShadow: 2 }} />}
                        {usingCamera && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: 280, borderRadius: 8, transform: 'scaleX(-1)', border: '2px solid #ccc' }} />
                                <Button variant="contained" color="secondary" size="small" startIcon={<PhotoCameraIcon />} onClick={capturePhoto} sx={{ mt: 1, fontWeight: 'bold' }}>Tomar Foto</Button>
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Button component="label" variant="outlined" size="small" startIcon={<UploadFileIcon />} color="primary">Subir Archivo<input type="file" accept="image/*" hidden onChange={handleFileChange} /></Button>
                            {!usingCamera && <Button variant="outlined" size="small" startIcon={<PhotoCameraIcon />} color="warning" onClick={startCamera}>Usar Cámara</Button>}
                        </Box>
                    </Box>

                    <Button type="submit" variant="contained" color="primary" size="large" startIcon={<SaveIcon />} sx={{ mt: 2, fontWeight: 'bold' }} disabled={loading}>{loading ? 'Guardando...' : 'Guardar Cambios'}</Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminEditarUsuario;