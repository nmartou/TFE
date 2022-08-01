import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../Slice/Dispatch';
import './Quiz.css';

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

    const currentQuiz = quiz.currentQuiz;

    useEffect(() => {
        if(currentStatus === 0) {
            if(currentQuiz.limit_time) {
                let second = currentQuiz.limit_time % 60;
                let minute = (currentQuiz.limit_time - second) / 60;
                setSeconds(second);
                setMinutes(minute);
                setStartingTimer(true);
                console.log(minutes + ":" + seconds);
            }
        }
    }, [currentStatus]);

    useEffect(() => {
        if(startingTimer) {
            startTimer();
        }
    }
    , [startingTimer]);

    const nextQuestion = async(id) => {
        if(currentQuiz.content[currentStatus].response == id.toString()) {
            document.getElementById(id).classList.add("button-good-response");
            setCurrentResponses(currentResponses + 1);
        }
        else {
            document.getElementById(id).classList.add("button-bad-response");
        }
        setTimeout(() => { setCurrentStatus(currentQuiz.content.length - 1 <= currentStatus ? -2 : currentStatus + 1) }, 1000);
        setTimeout(() => { document.getElementById(id).classList.remove("button-bad-response") }, 999);
        setTimeout(() => { document.getElementById(id).classList.remove("button-good-response") }, 999);
    }

    const startTimer = () => {
        let interval = setInterval(() => {
            console.log(minutes + ":" + seconds);
            if(seconds > 0) {
                setSeconds(seconds => seconds - 1);
            }
            else if(seconds === 0) {
                if(minutes > 0) {
                    setMinutes(minutes => minutes - 1);
                    setSeconds(59);
                }
                else {
                    setCurrentStatus(-2);
                    clearInterval(interval);
                }
            }
        }, 1000);
        //return () => clearInterval(interval);
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
                                <Link to="/quiz"><button className='btn btn-primary'>Retour aux quiz</button></Link>
                            </div>
                            ) : (
                            <div>
                                {currentQuiz.limit_time ? <h2>Temps restant : {minutes < 10 ? "0"+minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h2> : <></>}
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