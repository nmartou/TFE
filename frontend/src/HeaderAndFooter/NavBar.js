import React, { useContext, useEffect, useState } from "react";
import "./HeaderAndFooter.css";
import { AuthContext } from "../Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NavBar() {
    const { user, setUser, auth, token, setToken, logout, setIsLoading, isLoading } = useContext(AuthContext);
    const [ isUser, setIsUser ] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if (!token && !user) {
            var usr = localStorage.getItem("user");
            var tkn = localStorage.getItem("token");
            if(tkn && usr) {
                setUser(JSON.parse(usr));
                setToken(tkn);
                CheckLocation();
            } else if(tkn && !usr) {
                auth();
            }
        }
        setIsLoading(false);
    }, [token, user]);

    useEffect(() => {
        if(!isLoading) {
            CheckLocation();
            setIsUser(false);
        }
    }, [isUser]);

    /**
     * @description: Function to check if the user is logged in or not
     */
    const CheckLocation = () => {
        let location = window.location.pathname;
        let usr = localStorage.getItem('user');
        usr = JSON.parse(usr);
        if (location == "/quiz/create" && (!usr || usr.status !== "admin")) {
            return window.location.href = "/";
        }
        else if (location == "/quiz/*" && !user) {
            return window.location.href = "/login";
        }
    }

    return (
        <div>
            <nav className="nav justify-content-center navbar-expand-lg">
                <a className="navbar-brand" href="/">Accueil</a>

                    <ul className="nav justify-content-center">
                        <li className="navbar-item">
                            <a className="nav-link" href="/games">Jeux</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/quiz">Quiz</a>
                        </li>
                        {user && token ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/account">Mon compte</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/" onClick={logout}>Se déconnecter</a>
                                </li>
                            </>
                            ) : (
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