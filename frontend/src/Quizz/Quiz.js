import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { useLocation, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../Slice/Dispatch';
import './Quiz.css';

function Quiz(props) {
    const quiz = props.quiz;
    const { user, token } = useContext(AuthContext);
    let { state } = useLocation();
    const [currentStatus, setCurrentStatus] = useState(-1);
    const [currentResponses, setCurrentResponses] = useState(0);
    const currentQuiz = quiz.currentQuiz;

    useEffect(() => {
        if(!state && props.quiz && props.quiz.currentQuiz) {
            state = quiz.currentQuiz;
            console.log(state);
        }
    }, [state]);

    const nextQuestion = (id) => {
        if(currentQuiz.content[currentStatus].response == id.toString()) {
            setCurrentResponses(currentResponses + 1);
        }
        setCurrentStatus(currentQuiz.content.length - 1 <= currentStatus ? -2 : currentStatus + 1);
    }

    return(
        <div>
            <section className='quiz-question'>
                {currentStatus === -1 ? 
                    (user && token ? (
                        <div className='question-div'>
                            <h1>{state ? state.title : currentQuiz.title}</h1>
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
                                <Link to="/quiz"><button>Retour aux quiz</button></Link>
                            </div>
                            ) : (
                            <div>
                                <h1>{currentQuiz.content[currentStatus].question}</h1>
                                {currentQuiz.content[currentStatus].choice.map((choice, index) => (
                                    <button 
                                        key={index} 
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