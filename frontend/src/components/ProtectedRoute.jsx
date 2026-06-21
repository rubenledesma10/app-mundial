import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({ allowedRoles }) => {
    const { token, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if (!token) { //si no hay token lo manda a loguearse
            navigate('/login', { replace: true });
        }
    
        else if (allowedRoles && !allowedRoles.includes(user?.rol)) { //Si hay roles permitidos, ej:'admin' y el rol del usuario no coincide, mlo mando al Home
            navigate('/', { replace: true });
        }
    }, [token, user, allowedRoles, navigate]);


    return token && (!allowedRoles || allowedRoles.includes(user?.rol)) ? <Outlet /> : null; //si esta todo ok, que pase a la página que quería ver
};

export default ProtectedRoute;