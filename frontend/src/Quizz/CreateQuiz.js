import React, { Component } from 'react';
import axios from 'axios';
import Quiz from './Quiz.css';

const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export default class CreateQuiz extends Component {
     

    constructor(props) {
        super(props);
        this.state = {
            lastQuiz: "q-0",
            lastNumber: 0,
            item: [
            {
                id: "q-0",
                number: 0,
                question: "",
                response: '',
                choice: [{letter: "A", res: "", pos: 0}, {letter: "B", res: "", pos: 1}],
            }
            ]
        };
        this.addQuestion = this.addQuestion.bind(this);
        this.addChoice = this.addChoice.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
    }

    adaptOrder(choices, num) {
        for(let id in choices) {
            if(id < num) continue;
            else {
                choices[id].letter = alpha[id];
                choices[id].pos = id;
            }
        }
        return choices;
    }

    //Supprime le choix désiré
    deleteChoice(event) {
        let arrayId = event.target.id.split("-");
        let items = this.state.item;
        let num2 = parseInt(arrayId[2]);
        if(items[arrayId[1]].choice.length - 1 === num2) {
            items[arrayId[1]].choice.splice(num2)
        }
        else {
            items[arrayId[1]].choice.splice(num2, 1);
            items[arrayId[1]].choice = this.adaptOrder(items[arrayId[1]].choice, num2)
        }
        console.log(items);
        this.setState({item: items});
        return true;
    }

    handleChange(event) {
        console.log(event.target.value);
    }

    deleteQuestion(id) {
        let stringId = id.split('-');
        let items = this.state.item;
        items[parseInt(stringId[1])].splice(parseInt(stringId[1]), 1);
        this.setState({item: items});
    }

    //Ajoute une question au questionnaire
    addQuestion() {
        let list = this.state.item;
        let lastNum = list[list.length - 1].number;
        lastNum += 1;
        list.push({
            id: "q-" + lastNum.toString(),
            number: lastNum,
            question: "",
            response: '',
            choice: [{letter: "A", res: "", pos: 0}, {letter: "B", res: "", pos: 1}]
        });
        this.setState({item: list});
    }

    //Ajoute un choix à la question donnée
    addChoice(id) {
        let items = this.state.item;
        let lastNum = 0;
        for(let idItem in items) {
            if(items[idItem].id === id) {
                var choice = items[idItem].choice;
                lastNum = choice[choice.length - 1].pos;
                if(items[idItem].choice.length - 1 > 24) {
                    console.log("La limite de réponse à été atteinte !");
                    return false;
                }
                items[idItem].choice.push({letter: alpha[lastNum + 1], res: '', pos: lastNum + 1});
                //return items;
                this.setState({item: items});
            }
        }
    }

    handleSubmit() {
        axios.post("http://localhost:5000/api/quiz/create", this.state.item)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return(
            <div>
                <section>
                    <input type="button" className='btn btn-primary' onClick={this.addQuestion} value="Ajout" />
                    <form id="quiz-form">
                        <h2>Quiz creator</h2>
                        {this.state.item.map((item) => (
                            <div id={item.id} key={item.number}>
                                <h3>{item.question}</h3>
                                <input className="input" type="text" placeholder='Question'></input>
                                {item.choice.map((res) => (
                                    <div key={1000 + res.pos}>
                                        <label className="ques">Réponse {res.letter} : </label>
                                        <input className="input" type="text" onChange={this.handleChange}></input>
                                        <input type="button" id={item.id + '-' + res.pos.toString()} className="cross-btn bi bi-x" onClick={this.deleteChoice} value="X" />
                                    </div>
                                ))}
                                <input type='button' className="btn btn-primary" onClick={() => this.addChoice(item.id)} value="Ajouter une réponse" />
                                <input type='button' className="btn btn-outline-danger" onClick={() => this.deleteQuestion(item.id)} value="Supprimer" />
                            </div>
                        ))}
                    </form>
                </section>
            </div>
        )
    }
}