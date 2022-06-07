import React, { useContext, useEffect } from "react";
import "./NavBar.css";
import { AuthContext } from "../Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useLocation } from "react-router-dom";

export default function NavBar() {
    const { user, setUser, auth, token, setToken, logout, setIsLoading } = useContext(AuthContext);

    useEffect(() => {
        if (!token && !user) {
            setIsLoading(true);
            var usr = localStorage.getItem("user");
            var tkn = localStorage.getItem("token");
            if(tkn && usr) {
                setUser(JSON.parse(usr));
                setToken(tkn);
                setIsLoading(false);
            } else if(tkn && !usr) {
                auth();
                setIsLoading(false);
            }
            //CheckLocation();
        }
    }, [token, user, auth, setUser, setToken]);

    /*const CheckLocation = () => {
        const location = useLocation();
        if (location.pathname === "/quiz/create" && user && !user.status === "admin" && token) {
            return (<Navigate to="/" />)
        }
    }*/

    return (
        <div>
            <nav className="nav justify-content-center navbar-expand-lg">
                <a className="navbar-brand" href="/">Accueil</a>

                    <ul className="nav justify-content-center">
                        <li className="navbar-item">
                            <a className="nav-link" href="/games">Section Jeux</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/quiz">Section Quiz</a>
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