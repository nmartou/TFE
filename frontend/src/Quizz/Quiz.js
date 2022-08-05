import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../Slice/Dispatch';
import './Quiz.css';
import axios from 'axios';
import { API_URL } from '../utils';
import { toast } from 'react-toastify';

let interval;

function Quiz(props) {
    const quiz = props.quiz;
    const { user, token } = useContext(AuthContext);
    const [ currentStatus, setCurrentStatus ] = useState(-1);
    const [ currentResponses, setCurrentResponses ] = useState(0);
    const [ seconds, setSeconds ] = useState(0);
    const [ minutes, setMinutes ] = useState(0);
    const [ startingTimer, setStartingTimer ] = useState(false);

    const secondsRef = useRef(seconds);
    const minutesRef = useRef(minutes);
    secondsRef.current = seconds;
    minutesRef.current = minutes;
    let min, sec;

    const currentQuiz = quiz.currentQuiz;

    /**
     * @description: Function to load the timer data at the beginning of the loading of the page if there is ones
     */
    useEffect(() => {
        if(currentStatus === 0) {
            if(currentQuiz.limit_time) {
                let second = currentQuiz.limit_time % 60;
                let minute = (currentQuiz.limit_time - second) / 60;
                setSeconds(second);
                setMinutes(minute);
                setStartingTimer(true);
            }
        }
    }, [currentStatus]);

    /**
     * @description: Function to start the timer function if there is a timer
     */
    useEffect(() => {
        if(startingTimer) {
            startTimer();
        }
    }
    , [startingTimer]);

    /**
     * @description: Function to send the responses to the database when all responses are done
     */
    useEffect(() => {
        if(currentStatus === -2) {
            sendResponses();
        }
    }, [currentStatus]);

    /**
     * @description: Function to go to the next question when the user click on a response during the quiz
     * @param {number} id: index of the response
     * 
     */
    const nextQuestion = async(id) => {
        if(currentQuiz.content[currentStatus].response == id.toString()) {
            setCurrentResponses(currentResponses + 1);
            document.getElementById(id).classList.add("button-good-response");
        }
        else {
            document.getElementById(id).classList.add("button-bad-response");
        }
        setTimeout(() => {
            if(currentQuiz.content.length - 1 <= currentStatus) {
                setCurrentStatus(-2);
                setStartingTimer(false);
                clearInterval(interval);
                //sendQuiz();
            }
            else{
                setCurrentStatus(currentStatus + 1);
            }
        }, 1000);
        setTimeout(() => { document.getElementById(id).classList.remove("button-bad-response") }, 999);
        setTimeout(() => { document.getElementById(id).classList.remove("button-good-response") }, 999);
    }

    /**
     * @description: Function to start the timer
     */
    const startTimer = () => {
        min = minutes;
        sec = seconds;
        interval = setInterval(() => {
            if(sec > 0) {
                sec -= 1;
                setSeconds(sec);
            }
            else if(sec === 0) {
                if(min > 0) {
                    sec = 59;
                    min -= 1;
                    setMinutes(min);
                    setSeconds(sec);
                }
                else {
                    setCurrentStatus(-2);
                    clearInterval(interval);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }

    /**
     * @description: Function to send the number of good responses to the database
     */
    const sendResponses = () => {
        /*axios.put(API_URL + '/quiz/response/', 
            {
                id_user: user.id_user,
                id_quizz: currentQuiz.id_quizz,
                best_score: currentResponses,
                max_score: currentQuiz.content.length
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
        .then(res => {
            console.log(res);
            toast.success(res.data.message);
        }).catch(err => {
            console.log(err);
            toast.error(err);
        });*/


        axios.get(API_URL + '/quiz/response/' + user.id_user + "/" + currentQuiz.id_quizz, 
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => {
                if(res.data.get) {
                    axios.put(API_URL + '/quiz/response',
                        {
                            best_score: currentResponses, 
                            id_quizz: currentQuiz.id_quizz, 
                            max_score: currentQuiz.content.length, 
                            id_user: user.id_user
                        },
                        {
                            headers: {
                                'Authorization': 'Bearer ' + token
                            }
                        })
                        .then(res => {
                            toast.success(res.data.message);
                        })
                        .catch(err => {
                            toast.error(err);
                        });
                }
                else {
                    console.log("2", res);
                    axios.post(API_URL + '/quiz/response', 
                        {
                            best_score: currentResponses, 
                            id_quizz: currentQuiz.id_quizz, 
                            max_score: currentQuiz.content.length, 
                            id_user: user.id_user
                        }, 
                        {
                            headers: {
                                'Authorization': 'Bearer ' + token
                            }
                        })
                        .then(res => {
                            toast.success(res.data.message);
                        })
                        .catch(err => {
                            toast.error(err);
                        });
                }
            })
            .catch(err => {
                toast.error(err);
            });
    }

    return(
        <div className='quiz'>
            <section className='quiz-section'>
                {currentStatus === -1 ? 
                    (user && token ? (
                        <div className='question-div'>
                            <h1>{currentQuiz ? currentQuiz.title : <></>}</h1>
                            {currentQuiz.limit_time ? 
                                <h2>Tu as {(currentQuiz.limit_time - (currentQuiz.limit_time % 60)) / 60} minute(s) et {currentQuiz.limit_time % 60} seconde(s) pour réaliser ce quiz !</h2> : <></>}
                            <button className='button-start-quiz' onClick={() => setCurrentStatus(0)}>Commencer quiz</button>
                        </div>
                        ) : 
                    <div>
                        Vous n'êtes pas connecté ! Connectez-vous <Link to="/login"><button className='btn btn-primary'>ici</button></Link>
                    </div>       
                    ) : (
                    <div className='question-div'>
                        {currentStatus === -2 ? (
                            <div>
                                <p>Merci d'avoir joué ! Votre score est de {currentResponses} sur {currentQuiz.content.length} !</p>
                                <Link to="/quiz"><button className='btn btn-primary' onClick={() => clearInterval(interval)}>Retour aux quiz</button></Link>
                            </div>
                            ) : (
                            <div>
                                {currentQuiz.limit_time ? 
                                    <h2>
                                        Temps restant : {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
                                    </h2> 
                                : <></>}
                                <h1>{currentQuiz.content[currentStatus].question}</h1>
                                {currentQuiz.content[currentStatus].choice.map((choice, index) => (
                                    <button 
                                        key={index}
                                        id={index} 
                                        className='button-response' 
                                        onClick={() => nextQuestion(index)
                                        }>
                                        {choice.res}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    )
                }
            </section>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Quiz);