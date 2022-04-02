import axios from 'axios';
import React, {Component} from 'react';
import "./Auth.css";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            pseudo: "",
            password: "",
            verified: false
        }
        
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePseudo = this.onChangePseudo.bind(this);
        this.onChangeVerified = this.onChangeVerified.bind(this);
    }

    onSubmit() {
        if(!this.state.verified) return console.log("Second password is different from the first one");
        axios.post('http://localhost:5000/api/auth/', this.state)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onChangeEmail(event) {
        this.setState({email: event.target.value});
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
                <form onSubmit={this.onSubmit}>
                    <label>Pseudonyme</label>
                    <input type='text' required placeholder='Pseudo' onChange={this.onChangePseudo} />
                    <label>Email</label>
                    <input type='email' required placeholder='Email' onChange={this.onChangeEmail} />
                    <label>Mot de passe</label>
                    <input type='password' placeholder='Mot de passe' required onChange={this.onChangePassword} />
                    <label>Vérification du mot de passe</label>
                    <input type='password' placeholder='Retapez votre mot de passe' required onChange={this.onChangeVerified} />
                    <input type='submit' value="S'inscrire" />
                </form>
                <div>
                    <p>{this.state.password}</p>
                    <p>{this.state.email}</p>
                    <p>{this.state.pseudo}</p>
                    <p>{this.state.verified}</p>
                </div>
            </div>
        )
    }
}

export default SignUp;