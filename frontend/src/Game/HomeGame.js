import React, { Component } from 'react';
import './Game.css';

import logo from "../assets/Brugge.jpg";

export default class HomeGame extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='home-game'>
                <p>Home Game page</p>
                <section className='game-section'>
                    <a href='/games/FootballJumper'>
                        <img className='img-games' alt='Bande dessinée Qui a volé OL-Bot, tome 1' src={logo}></img>
                    </a>
                </section>
            </div>
        )
    }
}