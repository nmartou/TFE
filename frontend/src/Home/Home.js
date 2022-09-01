import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import './Home.css';
import axios from 'axios';
import { API_URL, URL } from '../utils';

import Francois from "../assets/Francois_Maingoval.jpg";
import Ada from '../assets/ada-enigma.jfif';
import Barbara from '../assets/barbara-wolf.jpg';
//import Satan from '../assets/empreinte-de-satan.jpg';
import Corpus from '../assets/corpus-christi_illustration.jpg';
import OL from '../assets/OL-coupe.jpg';
import Neron from '../assets/alix-neron.jpg';
import { toast } from 'react-toastify';

const FormData = require('form-data');

export default function Home() {

    const { user, token } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [addActu, setAddActu] = useState(false);
    const [image, setImage] = useState({});
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [link, setLink] = useState('');
    const [actu1, setActu1] = useState({});
    const [actu2, setActu2] = useState({});
    const [elementToModify, setElementToModify] = useState(0);
    const [elementId, setElementId] = useState(0);
    const [listActu, setListActu] = useState([]);

    const showHideClassName = showModal ? "modal display-block" : "modal display-none";

    useEffect(() => {
        fetchData();
    } , []);

    useEffect(() => {
        if(addActu == false) {
            setImage({});
            setTitle('');
            setDate('');
            setLink('');
        }
    } , [addActu]);

    const fetchData = async () => {
        await axios(`${API_URL}/home/actu`)
            .then(res => {
                console.log(res.data);
                if(!res.data) return false;
                for(let i of res.data.actuHome) {
                    if(i.id_element === 1) {
                        for(let j of res.data.actu) {
                            if(i.id_actuality === j.id_actuality) {
                                setActu1(j);
                            }
                        }
                    }
                    else if(i.id_element === 2) {
                        for(let j of res.data.actu) {
                            if(i.id_actuality === j.id_actuality) {
                                setActu2(j);
                            }
                        }
                    }
                }
                setListActu(res.data.actu);
            }).catch(err => {
                console.log(err);
            });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        var formData = new FormData();
        if(image.length > 1) return console.log('Image is required');
        formData.append("image", image, image.name);
        formData.set('title', title);
        formData.set('date', date);
        formData.set('link', link);
        console.log(formData);

        await axios.post(API_URL + '/home/actu/', 
            formData,
            {headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }})
            .then(res => {
                window.location.reload();
            }).catch(err => {
                console.log(err);
            });
    }

    const setModalTrue = (e) => {
        setShowModal(true);
        setElementToModify(e.target.id);
        if(e.target.id === 1) {
            setElementId(actu1.id_actuality);
        }
        else if(e.target.id === 2) {
            setElementId(actu2.id_actuality);
        }
    }

    const handleModify = async(e) => {
        e.preventDefault();
        await axios.put(API_URL + '/home/', 
            {
                id_element: elementToModify,
                id_actuality: elementId
            },
            {headers: { Authorization: `Bearer ${token}` }})
            .then(res => {
                toast.success('Actualité modifiée');
                window.location.reload();
            }).catch(err => {
                console.log(err);
            });
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
                    {user && user.status === "admin" ? <><button id='1' className='btn btn-primary' onClick={setModalTrue}>Modifier</button><br/></> : <br/>}
                    <img alt="" src={URL + "/assets/" + actu1.image} />
                    <p>{actu1.title}</p>
                    <p className='actu-date'>{new Date(actu1.date).toLocaleDateString("fr")}</p>
                    <button className='know-more-button'><a href={actu1.link}>Voir plus</a></button>
                </div>
                <div className='actu'>
                    {user && user.status === "admin" ? <><button id='2' className='btn btn-primary' onClick={setModalTrue}>Modifier</button><br/></> : <br/>}
                    <img alt="" src={URL + "/assets/" + actu2.image} />
                    <p>{actu2.title}</p>
                    <p className='actu-date'>{new Date(actu2.date).toLocaleDateString("fr")}</p>
                    <button className='know-more-button'><a href={actu2.link}>Voir plus</a></button>
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
                                        <form>
                                            <label className='label-add-actu'>Titre de l'actualité</label><br/>
                                            <input className="input-add-actu" type="text" value={title} onChange={(text) => setTitle(text.target.value)} /><br/>
                                            <label className='label-add-actu'>Illustation</label><br/>
                                            <input className="input-add-actu-image" type="file" accept="image/png, image/jpeg, image/jpg" onChange={(image) => setImage(image.target.files[0])}/><br/>
                                            <label className='label-add-actu'>Date</label><br/>
                                            <input className="input-add-actu-date" type="date" value={date} onChange={(text) => setDate(text.target.value)} /><br/>
                                            <label className='label-add-actu'>Lien URL de l'article</label><br/>
                                            <input className="input-add-actu" type="text" value={link} onChange={(text) => setLink(text.target.value)} /><br/>
                                            <button className="btn btn-secondary button-add-actu" onClick={() => setAddActu(false)}>Retour</button>
                                            <button className='btn btn-primary button-add-actu' onClick={handleSubmit}>Envoyer</button>
                                        </form>
                                    </div>
                                    :
                                    <>
                                        <div className='account-pop-up-div-input'>
                                            <select className='select-actu' value={elementId} onChange={(element) => setElementId(element.target.value)}>
                                                {listActu && listActu.length > 0 ? listActu.map((actu, index) => {
                                                    return <option key={index} value={actu.id_actuality}>{actu.title + " - " + new Date(actu.date).toLocaleDateString("fr")}</option>
                                                }): <option value="">Aucune actualité</option>}
                                            </select>
                                            <button className='btn btn-primary button-add-actu' onClick={() => setAddActu(true)}>Ajouter une actualité</button>
                                        </div><br />
                                    </>}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <p id="warning"></p>
                            <button className='btn btn-primary' onClick={handleModify}>Modifier</button>
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