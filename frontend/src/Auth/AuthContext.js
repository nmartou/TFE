import React, { useState, createContext } from 'react';
import axios from 'axios';
import res from 'express/lib/response';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (data) => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:5000/api/auth/login', data)
                .then((res) => {
                    setUser(res.data.user);
                    setToken(res.data.token);
                    setLoading(false);
                    return res.status;
                })
                .catch((err) => {
                    setError(err.response.data.message);
                    setLoading(false);
                    //return err.status;
                });
        } catch (err) {
            setError(err.response.data.message);
            setLoading(false);
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
    }

    const auth = async() => {
        setLoading(true);
        setError(null);
        try {
            await axios.get('http://localhost:5000/api/auth/')
                .then((res) => {
                    setUser(res.data.user);
                    setLoading(false);
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
            token,
            loading,
            error,
            login,
            logout,
            auth,
            mailAddress,
            setMailAddress,
            password,
            setPassword
        }}>
            {props.children}
        </AuthContext.Provider>
    )
            
}