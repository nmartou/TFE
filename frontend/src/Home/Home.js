import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import NavBar from '../NavBar/NavBar';

export default function Home() {
    const { user, token } = useContext(AuthContext);

    return(
        <div>
            <NavBar />
            <h1>
                Bienvenue sur le site de François Maingoval
            </h1>
            {user && token && <p>Bienvenue {user? user.pseudo + " " : <></>}!</p>}
        </div>
    );
}