import React, { useContext, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import './Home.css';
import axios from 'axios';
import { API_URL } from '../utils';
//import multer from 'multer';

import Francois from "../assets/Francois_Maingoval.jpg";
import Ada from '../assets/ada-enigma.jfif';
import Barbara from '../assets/barbara-wolf.jpg';
//import Satan from '../assets/empreinte-de-satan.jpg';
import Corpus from '../assets/corpus-christi_illustration.jpg';
import OL from '../assets/OL-coupe.jpg';
import Neron from '../assets/alix-neron.jpg';

export default function Home() {

    const { user, token } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [addActu, setAddActu] = useState(false);
    const [image, setImage] = useState({});

    const showHideClassName = showModal ? "modal display-block" : "modal display-none";

    const handleSubmit = async(e) => {
        e.preventDefault();
        const fromData = new FormData();
        fromData.append("image", image, image.name);
        var te = document.getElementById("input-add-actu-image").file[0];
        console.log(te);
        return false;
        await axios.post(API_URL + '/actu/', 
            {
                "title": e.target.title.value,
                "image": e.target.image.value,
                "date": toString(e.target.date.value),
                "link": e.target.link.value
            },
            {headers: { Authorization: `Bearer ${token}` }})
    }

    const handleChangeImage = (e) => {
        console.log(e.target.name);
    }

    return(
        <div className='home'>
            <section className='invisible-section'></section>
            <div className='author-title'>
                <h2>Qui suis-je ?</h2>
            </div>
            <section className='author-section'>
                
                <div className='author-text'>
                    <p>François Maingoval dit Maingoval, né le 5 mai 1975 à Uccle dans l’arrondissement de Bruxelles-Capitale est
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
                    {user && user.status === "admin" ? <><button className='btn btn-primary' onClick={() => setShowModal(true)}>Modifier</button><br/></> : <br/>}
                    <img alt="Photo de groupe avec François Maingoval et Eric Albert" src={Corpus} />
                    <p>FRANCOIS MAINGOVAL ET ERIC ALBERT - CORPUS CHRISTI</p>
                    <p className='actu-date'>21 MAI 2013</p>
                    <button className='know-more-button'><a href="https://www.generationbd.com/interviews/20-interviews-ecrites/2451-francois-maingoval-et-eric-albert-corpus-christi.html">Voir plus</a></button>
                </div>
                <div className='actu'>
                    {user && user.status === "admin" ? <><button className='btn btn-primary' onClick={() => setShowModal(true)}>Modifier</button><br/></> : <br/>}
                    <img alt="Bande dessinée Qui a volé OL-bot de François Maingoval" src={OL} />
                    <p>QUI A VOLE OL-BOT ? LA NOUVELLE BD DE FRANCOIS MAINGOVAL…</p>
                    <p className='actu-date'>3 MARS 2020</p>
                    <button className='know-more-button'><a href="https://www.lyonpremiere.fr/mes-infos/qui-a-vole-ol-bot-la-nouvelle-bd-de-francois-maingoval/">Voir plus</a></button>
                </div>
            </section>
            <div className={showHideClassName} id="add_Product" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Sélectionnez l'actualité souhaité</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id="addProduct-id">
                                {addActu ? 
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            <label className='label-add-actu'>Titre de l'actualité</label><br/>
                                            <input className="input-add-actu" type="text" /><br/>
                                            <label className='label-add-actu'>Illustation</label><br/>
                                            <input className="input-add-actu-image" type="file" accept="image/png, image/jpeg" onChange={handleChangeImage}/><br/>
                                            <label className='label-add-actu'>Date</label><br/>
                                            <input className="input-add-actu-date" type="date" /><br/>
                                            <label className='label-add-actu'>Lien URL</label><br/>
                                            <input className="input-add-actu" type="text" /><br/>
                                            <button className="btn btn-secondary button-add-actu" onClick={() => setAddActu(false)}>Retour</button>
                                            <button type="submit" className='btn btn-primary button-add-actu'>Envoyer</button>
                                        </form>
                                    </div>
                                    :
                                    <>
                                        <div className='account-pop-up-div-input'>
                                            <select className='select-actu'>
                                                <option>Coucou</option>
                                            </select>
                                            <button className='btn btn-primary button-add-actu' onClick={() => setAddActu(true)}>Ajouter une actualité</button>
                                        </div><br />
                                    </>}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <p id="warning"></p>
                            <button className='btn btn-primary'>Modifier</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
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