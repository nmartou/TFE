import React, { Component } from 'react';

export default class Home extends Component {
    render() {
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
                <a href='/SignUp'>
                    <button className='btn btn-primary'>Sign Up</button>
                </a>
            </div>
        );
    }
}