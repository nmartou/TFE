import axios from 'axios';
import React, {useContext, useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import './Auth.css';
import { AuthContext } from './AuthContext';
import { API_URL } from '../utils';

export default function Account() {
    const { user, logout } = useContext(AuthContext);
    const [tempEmail, setTempEmail] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState("");

    const showHideClassName = showModal ? "modal display-block" : "modal display-none";

    useEffect(() => {
        if(user) {
            console.log("user :", user);
            ModifyEmail();
        }
    }, [user]);

    const ModifyEmail = () => {
        let mail = user.mail_address;
        let tempMail = "";
        let atIndice;
        for(let i in mail) {
            if(i < 2) {
                tempMail += mail[i];
            }
            else if(mail[i] === "@") {
                atIndice = i;
                tempMail += mail[i];
            }
            else if(i > atIndice) {
                tempMail += mail[i];
            }
            else {
                tempMail += "*";
            }
        }
        setTempEmail(tempMail);
    }

    const handleDelete = async() => {
        if(deleteAccount !== "SUPPRIMER") {
            return toast.error("Veuillez entrer 'SUPPRIMER'");
        }
        else {
            let token = localStorage.getItem("token");
            await axios.delete(API_URL + '/auth/delete/' + user.id_user, {headers: { Authorization: `Bearer ${token}` }})
                .then((res) => {
                    toast.success("Compte supprimé");
                    logout();
                    window.location.href = "/";
                })
                .catch((err) => {
                    toast.error("Erreur lors de la suppression du compte");
                })
        }
        // setDeleteAccount("");
        setShowModal(false);
    }

    const changeValue = (e) => {
        setDeleteAccount(e.target.value);
    }

    const dontShowModal = () => {
        setShowModal(false);
        setDeleteAccount("");
    }

    return(
        <div className='account'>
            {!user ?
            <>
                <p className='account-not-connected' style={{height: 400}}>Vous n'êtes pas connecté ! <a className='account-link-login' href='/login'>Se connecter</a></p>
            </> : 
            <>
                <h1 className='account-title'>Account page</h1>
                <section className='account-section'>
                    <div className='account-tab'>
                        <button className='account-tab-button'>Mon compte</button>
                    </div>
                    <div className='account-separator'></div>
                    <div className='account-info'>
                        <p>Pseudo : {user ? user.pseudo : "Not found"}</p>
                        <p>E-mail : {tempEmail ? tempEmail : "Not found"}</p>
                        <p>Mot de passe : ********</p>
                        <button className='btn btn-outline-danger account-delete-button' onClick={() => setShowModal(!showModal)}>Supprimer mon compte</button>
                    </div>
                </section>
                <div className={showHideClassName} id="add_Product" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Supprimer mon compte</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={dontShowModal}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="addProduct-id">
                                    <p className='account-pop-up-text'>
                                        ATTENTION ! L'action que vous allez effectuer est irréversible. Si vous souhaitez supprimer votre compte, écrivez "SUPPRIMER" pour confirmer l'action.
                                    </p>
                                    <div className='account-pop-up-div-input'><input className='account-pop-up-input' type="text" onChange={changeValue} value={deleteAccount} /></div><br />
                                </form>
                            </div>
                            <div className="modal-footer">
                                <p id="warning"></p>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={dontShowModal}>Fermer</button>
                                <button className='btn btn-outline-danger account-pop-up-button' onClick={handleDelete}>Supprimer mon compte</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </>}
        </div>
    )
}