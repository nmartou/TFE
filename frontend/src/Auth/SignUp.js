import axios from 'axios';
import React, {Component} from 'react';
import "./Auth.css";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { API_URL, URL } from '../utils';


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mail_address: "",
            pseudo: "",
            password: "",
            verified: false
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePseudo = this.onChangePseudo.bind(this);
        this.onChangeVerified = this.onChangeVerified.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * @description - Function to submit form for 
     * @param {*} event 
     * @returns 
     */
    onSubmit(event) {
        event.preventDefault();
        if(this.state.password.length < 8) return toast.error("Le mot de passe doit contenir au moins 8 caractères");
        if(!this.state.verified) {
            console.log("Second password is different from the first one");
            return false;
        }
        axios.post(API_URL + "/auth/", this.state)
            .then((res) => {
                console.log(res);
                if(res.status === 200) {
                    window.location.href = URL + "/login";
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Erreur lors de l'inscription ! Le pseudonyme ou l'adresse e-mail est sûrement déjà utilisé");
            })
    }

    onChangeEmail(event) {
        this.setState({mail_address: event.target.value});
    }

    onChangePassword(event) {
        this.setState({password: event.target.value});
    }

    onChangePseudo(event) {
        this.setState({pseudo: event.target.value});
    }

    onChangeVerified(event) {
        if(event.target.value === this.state.password) this.setState({verified: true});
        else this.setState({verified: false});
    }

    render() {
        return(
            <div>
                <ToastContainer />
                <form className='signup' onSubmit={this.onSubmit}>
                    <h2 className='signup-title'>S'inscrire</h2>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="pseudo">Pseudonyme</label>
                        <input className="form-control" type='text' required id="pseudo" placeholder='Pseudo' onChange={this.onChangePseudo} value={this.state.pseudo} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Email</label>
                        <input className="form-control" type='email' required placeholder='Email' onChange={this.onChangeEmail} value={this.state.mail_address} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Mot de passe</label>
                        <input className="form-control" type='password' placeholder='Mot de passe' required onChange={this.onChangePassword} value={this.state.password} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Vérification du mot de passe</label>
                        <input className="form-control" type='password' placeholder='Retapez votre mot de passe' required onChange={this.onChangeVerified} />
                    </div>
                    <div className='signup-gpu'>
                        <input className='signup-checkbox' type="checkbox" required />
                        <span className='signup-gpu-text'>
                            Accepter les <a className='gpu' href="http://localhost:3000/gpu">conditions d'utilisations</a> du site
                        </span>
                    </div>
                    <input className='btn btn-primary' type='submit' value="S'inscrire" />
                </form>
            </div>
        )
    }
}

export default SignUp;