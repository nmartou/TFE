import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import axios from "axios";
import "./Quiz.css";
import { API_URL } from "../utils";

import { mapDispatchToProps, mapStateToProps } from "../Slice/Dispatch";
import { connect } from "react-redux";

function ListQuiz() {
    const { user, token } = useContext(AuthContext);

    const [listQuiz, setListQuiz] = useState([]);

    /*useEffect(() => {
        handleLoadPage();
    }, [input]);

    const handleLoadPage = async() => {
        await axios.get(API_URL + "/quiz/all")
                    .then((res) => {
                        setListQuiz(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
    }*/

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className="first-child">Titre</th>
                        <th className="center-child">Nombre de question</th>
                        <th className="last-child">Timer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="first-child">Titre</td>
                        <td className="center-child">10</td>
                        <td className="last-child">Non</td>
                    </tr>
                    <tr>
                        <td className="last-first-child">dernier</td>
                        <td className="last-center-child">10</td>
                        <td className="last-last-child">Non</td>
                    </tr> 
                {listQuiz ? (
                    listQuiz.map((quiz, index) => (
                        index >= listQuiz.length - 1 ? 
                        <tr key={index}>
                            <td className="last-first-child">{quiz.title}</td>
                            <td className="last-center-child">10</td>
                            <td className="last-last-child">Non</td>
                        </tr> 
                        : (
                        <tr className="lign" key={index}>
                            <td>{quiz.title}</td>
                            <td>10</td>
                            <td>Non</td>
                        </tr>)
                ))) : (<></>)}
                </tbody>
            </table>
        </div>
    )
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ListQuiz);