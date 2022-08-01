import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Auth/AuthContext";
import "./Quiz.css";

import { mapDispatchToProps, mapStateToProps } from "../Slice/Dispatch";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function ListQuiz(props) {
    const quiz = props.quiz;
    const { user, token } = useContext(AuthContext);
    const dispatch = useDispatch();

    useEffect(async() => {
        await dispatch(props.GetListQuiz());
    }, []);

    /*useEffect(() => {
        if(quiz && quiz.listQuiz) {
            console.log(quiz.listQuiz);
        }
    }, [quiz]);*/

    const setCurrentQuiz = (object) => {
        dispatch(props.setCurrentQuiz(object));
    }

    return (
        <div className="list-quiz">
            <section className="list-quiz-section">
                {user && token && user.status === "admin" ? (
                    <div className="div-button">
                        <button className="btn-list-quiz" onClick={() => window.location.href = "/quiz/create"}>Créer un quiz</button>
                    </div>) : <></>}
                <table className="list-quiz-table">
                    <thead>
                        <tr>
                            <th className="first-child">Titre</th>
                            <th className="center-child">Nombre de question</th>
                            <th className="center-child">Timer</th>
                            <th className="last-child">Jouer</th>
                        </tr>
                    </thead>
                    <tbody>
                    {quiz && quiz.listQuiz ? (
                        quiz.listQuiz.map((quizz, index) => (
                            <tr key={index}>
                                <td className={index >= quiz.listQuiz.length - 1 ? "last-first-child" : "first-child"}>{quizz.title}</td>
                                <td className={index >= quiz.listQuiz.length - 1 ? "last-center-child" : "center-child"}>{quizz.content.length}</td>
                                <td className={index >= quiz.listQuiz.length - 1 ? "last-center-child" :  "center-child"}>{quizz.limit_time ? "Oui" : "Non"}</td>
                                <td className={index >= quiz.listQuiz.length - 1 ? "last-last-child" : "last-child"}>
                                    <Link to={{pathname:'/quiz/' + quizz.id_quizz, state: quizz }}>
                                        <button className="button-play" onClick={() => setCurrentQuiz(quizz)}>Jouer</button>
                                    </Link>
                                </td>
                            </tr>
                    ))) : (<></>)}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ListQuiz);