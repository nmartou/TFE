import React, { useState, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async(mail, password) => {
        setLoading(true);
        setError(null);
        await axios.post('http://localhost:5000/api/auth/login', {mail_address: mail, password: password})
            .then((res) => {
                toast.success('Connexion réussie');
                setUser(res.data.user);
                setToken(res.data.accessToken);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", res.data.accessToken);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
                setLoading(false);
                toast.error('Mauvais adresse mail et/ou mot de passe');
                return err.status;
            });
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    const auth = async() => {
        setLoading(true);
        setError(null);
        try {
            await axios.get('http://localhost:5000/api/auth/')
                .then((res) => {
                    console.log(res);
                    //setUser(res.data.user);
                    //setLoading(false);
                }
                ).catch((err) => {
                    setError(err.response.data.message);
                    setLoading(false);
                }
            );
        } catch (err) {
            setError(err.response.data.message);
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            loading,
            error,
            login,
            logout,
            auth,
            setLoading
        }}>
            {props.children}
        </AuthContext.Provider>
    )
            
}