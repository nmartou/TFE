import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import './Home.css';
import Francois from "../assets/Francois_Maingoval.jpg";
import Ada from '../assets/ada-enigma.jfif';
import Barbara from '../assets/barbara-wolf.jpg';
//import Satan from '../assets/empreinte-de-satan.jpg';
import Corpus from '../assets/corpus-christi_illustration.jpg';
import OL from '../assets/OL-coupe.jpg';
import Neron from '../assets/alix-neron.jpg';

export default function Home() {

    return(
        <div className='home'>
            <section className='invisible-section'></section>
            <div className='author-title'>
                <h2>Qui suis-je ?</h2>
            </div>
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
            <h2 className='actu-title'>Actualités</h2>
            <section className='actu-section'>
                <div className='actu'>
                    <img alt="Photo de groupe avec François Maingoval et Eric Albert" src={Corpus} />
                    <p>FRANCOIS MAINGOVAL ET ERIC ALBERT - CORPUS CHRISTI</p>
                    <p className='actu-date'>21 MAI 2013</p>
                    <button className='know-more-button'><a href="https://www.generationbd.com/interviews/20-interviews-ecrites/2451-francois-maingoval-et-eric-albert-corpus-christi.html">Voir plus</a></button>
                </div>
                <div className='actu'>
                    <img alt="Bande dessinée Qui a volé OL-bot de François Maingoval" src={OL} />
                    <p>QUI A VOLE OL-BOT ? LA NOUVELLE BD DE FRANCOIS MAINGOVAL…</p>
                    <p className='actu-date'>3 MARS 2020</p>
                    <button className='know-more-button'><a href="https://www.lyonpremiere.fr/mes-infos/qui-a-vole-ol-bot-la-nouvelle-bd-de-francois-maingoval/">Voir plus</a></button>
                </div>
            </section>
            <section className='bd-section'>
                <h2 className='bd-title'>Bandes dessinées</h2>
                <div className='bd-div'>
                    <img alt="Bande dessinée de François Maingoval" src={Ada} />
                    <img className='bd-second' alt="Bande dessinée de François Maingoval" src={Barbara} />
                    <img className='bd-second' alt="Bande dessinée de François Maingoval" src={Neron} />
                </div>
            </section>
        </div>
    );
}