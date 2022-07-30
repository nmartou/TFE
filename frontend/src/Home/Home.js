import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import './Home.css';
import Francois from "../assets/Francois_Maingoval.jpg";

export default function Home() {
    const { user, token } = useContext(AuthContext);

    return(
        <div className='home'>
            <section className='invisible-section'></section>
            <section className='author-section'>
                <div className='author-text'>
                    <p>François Maingoval dit Maingoval, né le 5 mai 19751 à Uccle dans l’arrondissement de Bruxelles-Capitale est
                        un artiste-peintre et scénariste de bande dessinée belge, principalement connu pour sa bande dessinée Ada Enigma et 
                        sa reprise de la série Alix.</p>
                    <button className='know-more-button'><a href='https://fr.wikipedia.org/wiki/Fran%C3%A7ois_Maingoval'>En savoir plus</a></button>
                </div>
                <div className='author-img'>
                    <img src={Francois} alt='Photo de François Maingoval' />
                </div>
            </section>
            <section className='actu-section'>
                <div>
                    <img alt="" src="" />
                    <p>Une actualité qui marque sans pour autant être la plus présente dans ce monde.</p>
                    <button>Voir plus</button>
                </div>
                <div>
                    <img alt="" src="" />
                    <p>Une autre actualité. Elle se trouve être dans un problème plus fréquent que la première qu'on a vu passer avant.</p>
                    <button>Voir plus</button>
                </div>
            </section>
            <section className='bd-section'></section>
        </div>
    );
}