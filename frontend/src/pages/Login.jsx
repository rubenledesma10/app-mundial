import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(false);

        if (!email.trim() || !password.trim()) { //validamos que no envíe campos vacíos
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            setLoading(true);
            
            const response = await axios.post('http://localhost:5000/api/auth/login', { //aountamos al endpoint de flask
                email: email,
                password: password
            });

            
            const { token, user } = response.data; // si esta todo ok, extramos el token y datos del usuario

            login(token, user); //guardamos todo en el authcontext


            navigate('/admin', { replace: true }); //si ya estamos logueado de verdad, podemos apasr

        } catch (err) { //capturamos el error del back

            const msgError = err.response?.data?.message || 'Error al conectar con el servidor';
            setError(msgError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Iniciar Sesión</h2>
            
            {error && <div style={{ color: 'red', marginBottom: '15px' }}>⚠️ {error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Correo Electrónico:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@mundial.com"
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', color: '#000' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', color: '#000' }}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ padding: '10px', background: '#007bff', color: '#white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    {loading ? 'Ingresando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
};

export default Login;