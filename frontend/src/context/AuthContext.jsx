/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext(); // creamos el contexto


export const AuthProvider = ({ children }) => { //creamos el Proveedor (Provider) que va a envolver a toda la app

    const [token, setToken] = useState(() => localStorage.getItem('jwt_token') || null); //intentamos recuperar el token y los datos del usuario del localStorage si ya inició sesión antes
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user_data');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    
    const [loading] = useState(false); //nicializo directamente en false ya que la lectura del localStorage se resuelve de forma sincrónica arriba

    useEffect(() => { //usamos useffect para sincronizar el estado con el localstorega
        if (token && user) {
            localStorage.setItem('jwt_token', token);
            localStorage.setItem('user_data', JSON.stringify(user));
        } else {
            localStorage.clear(); //limpiamos todo si se desloguea
        }
       
    }, [token, user]);

    const login = (jwtToken, userData) => {
        setToken(jwtToken);
        setUser(userData);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.clear();
    };

    const isAdmin = () => {
        return user?.rol === 'admin';
    };

    return (
        <AuthContext.Provider value={{ token, user, loading, login, logout, isAdmin }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};