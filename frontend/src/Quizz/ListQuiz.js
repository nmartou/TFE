import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import "./Quiz.css";

import { mapDispatchToProps, mapStateToProps } from "../Slice/Dispatch";
import { connect, useDispatch } from "react-redux";

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

    return (
        <div>
            <section className="list-quiz-section">
                {user && user.status === "admin" ? (
                    <div className="div-button">
                        <button className="btn-list-quiz" onClick={() => window.location.href = "/quiz/create"}>Créer un quiz</button>
                    </div>) : <></>}
                <table>
                    <thead>
                        <tr>
                            <th className="first-child">Titre</th>
                            <th className="center-child">Nombre de question</th>
                            <th className="last-child">Timer</th>
                        </tr>
                    </thead>
                    <tbody>
                    {quiz && quiz.listQuiz ? (
                        quiz.listQuiz.map((quizz, index) => (
                            <tr key={index}>
                                <td className={index >= quiz.listQuiz.length - 1 ? "last-first-child" : "first-child"}>{quizz.title}</td>
                                <td className={index >= quiz.listQuiz.length - 1 ? "last-center-child" : "center-child"}>{quizz.content.length}</td>
                                <td className={index >= quiz.listQuiz.length - 1 ? "last-last-child" : "last-child"}>{quizz.limitTime ? "Oui" : "Non"}</td>
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