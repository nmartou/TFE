import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';

export default function Home() {
    const { user, token, logout } = useContext(AuthContext);

    return(
        <div>
            <h1>
                Bienvenue sur le site de François Maingoval
            </h1>
            <a href='/quiz/create'>
                <button className='btn btn-primary'>Créer un quiz</button>
            </a>
            <a href='/games'>
                <button className='btn btn-primary'>Section jeux</button>
            </a>
            {user && token ?
                <>
                    <p>Bienvenue !</p>
                    <button onClick={logout}>Se déconnecter</button>
                </>
            :   <>
                    <a href='/SignUp'>
                        <button className='btn btn-primary'>S'inscrire</button>
                        
                    </a>
                    <a href="/login">
                        <button className='btn btn-primary'>Se connecter</button>
                    </a>
                </>}
                <div>{token}</div>
        </div>
    );
}