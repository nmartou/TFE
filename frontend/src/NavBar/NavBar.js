import React, { useContext, useEffect } from "react";
import "./NavBar.css";
import { AuthContext } from "../Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NavBar() {
    const { user, auth, token, logout } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            auth();
        }
    }, [token]);

    return (
        <div>
            <nav className="nav justify-content-center navbar-expand-lg">
                <a className="navbar-brand" href="/">Accueil</a>

                    <ul className="nav justify-content-center">
                        <li className="navbar-item">
                            <a className="nav-link" href="/games">Section Jeux</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/quiz/create">Section Quiz</a>
                        </li>
                        {user && token ? (
                            <li className="nav-item">
                                <a className="nav-link" href="/" onClick={logout}>Se déconnecter</a>
                            </li>) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Se connecter</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/signup">S'inscrire</a>
                                </li>
                            </>)}
                    </ul>
            </nav>
            <ToastContainer />
        </div>
    )
}