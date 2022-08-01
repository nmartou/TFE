import React, {useContext, useState, useEffect} from 'react';
import './Auth.css';
import { AuthContext } from './AuthContext';

export default function Account() {
    const { user } = useContext(AuthContext);
    const [tempEmail, setTempEmail] = useState(null);

    useEffect(() => {
        if(user) {
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

    const handleDelete = () => {
        console.log("Delete !");
    }

    return(
        <div className='account'>
            {!user ?
            <>
                <p style={{height: 400}}>Vous n'êtes pas connecté ! <a className='account-link-login' href='/login'>Se connecter</a></p>
            </> : 
            <>
                <h1 className='account-title'>Account page</h1>
                <section className='account-section'>
                    <div className='account-tab'>
                        <button className='account-tab-button'>Mon compte</button>
                    </div>
                    <div className='account-separator'></div>
                    <div className='account-info'>
                        <p>Pseudo : {user ? user.pseudo : ""}</p>
                        <p>E-mail : {tempEmail ? tempEmail : ""}</p>
                        <p>Mot de passe : ********</p>
                        <button className='btn btn-outline-danger account-delete-button' onClick={handleDelete}>Supprimer mon compte</button>
                    </div>
                </section>
            </>}
        </div>
    )
}