import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import "./Login.css";
import axios from 'axios';

export default function Login() {
    const { login, setLoading } = useContext(AuthContext);
    
    const [ password, setPassword ] = useState('');
    const [ mailAddress, setMailAddress ] = useState('');

    const handleSubmit = async(event) => {
        event.preventDefault();
        setLoading(true);
        let status = await login({ mail_address: mailAddress, password: password });
        if(status === 200) window.location.href="http://localhost:3000/";
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Adresse mail' onChange={(e) => setMailAddress(e.target.value)} value={mailAddress} />
                <input type='password' placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} value={password} />
                <button type='submit'>Se connecter</button>
            </form>
        </div>
    )
}