import { Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Registro from './Registro';

const AdminRegistro = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            {/* Botón para volver al Panel */}
            <Button variant="outlined" onClick={() => navigate('/admin')} sx={{ mb: 2 }}>
                ← Volver al Panel
            </Button>
            
            <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
                <Registro isAdminView={true} />
            </Box>
        </Container>
    );
};

export default AdminRegistro;