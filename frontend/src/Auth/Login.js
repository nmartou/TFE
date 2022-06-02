import React, { useContext, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const { login, user, token } = useContext(AuthContext);

    const [ password, setPassword ] = useState('');
    const [ mailAddress, setMailAddress ] = useState('');
    const [ isForgotChecked, setIsForgotChecked ] = useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault();
        await login(mailAddress, password);
    }

    return (
        <div>
            <ToastContainer />
            <form id="login" onSubmit={handleSubmit}>
                <h1>Se connecter</h1>
                <div className="form-outline mb-4">
                    <input type="email" id="form2Example1" className="form-control" onChange={(e) => setMailAddress(e.target.value)} value={mailAddress} required />
                    <label className="form-label" htmlFor="form2Example1">Adresse mail</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    <label className="form-label" htmlFor="form2Example2">Mot de passe</label>
                </div>

                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="form2Example31" value={isForgotChecked} onChange={(e) => setIsForgotChecked(e)} />
                            <label className="form-check-label" htmlFor="form2Example31"> Se souvenir de moi </label>
                        </div>
                    </div>

                    <div className="col">
                        <a href="#!">Mot de passe oublié ?</a>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Se connecter</button>
                
                <div>{user && token ? <Navigate to="/" /> : <></>} </div>

                <div className="text-center">
                    <p>Pas encore membre ? <a href="/signup">S'inscrire</a></p>
                </div>
            </form>
        </div>
    )
}