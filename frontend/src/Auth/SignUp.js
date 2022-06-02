import axios from 'axios';
import React, {Component} from 'react';
import "./Auth.css";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from '../utils';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mail_address: "test@gmail.com",
            pseudo: "test",
            password: "123",
            verified: false
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePseudo = this.onChangePseudo.bind(this);
        this.onChangeVerified = this.onChangeVerified.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

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
                    window.location.href = "http://localhost:3000/login";
                }
            })
            .catch((err) => {
                console.log(err);
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
                <form onSubmit={this.onSubmit}>
                    <label>Pseudonyme</label>
                    <input type='text' required placeholder='Pseudo' onChange={this.onChangePseudo} value={this.state.pseudo} />
                    <label>Email</label>
                    <input type='email' required placeholder='Email' onChange={this.onChangeEmail} value={this.state.mail_address} />
                    <label>Mot de passe</label>
                    <input type='password' placeholder='Mot de passe' required onChange={this.onChangePassword} value={this.state.password} />
                    <label>Vérification du mot de passe</label>
                    <input type='password' placeholder='Retapez votre mot de passe' required onChange={this.onChangeVerified} />
                    <input type='submit' value="S'inscrire" />
                </form>
            </div>
        )
    }
}

export default SignUp;