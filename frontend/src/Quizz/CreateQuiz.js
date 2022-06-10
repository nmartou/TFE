import React, { Component } from 'react';
import axios from 'axios';
import './Quiz.css';
import { toast } from 'react-toastify';

const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export default class CreateQuiz extends Component {
     

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            limitTime: null,
            content: [
            {
                id: "q-0",
                number: 0,
                question: "",
                response: null,
                choice: [{letter: "A", res: "", pos: 0}, {letter: "B", res: "", pos: 1}],
            }
            ]
        };
        this.addQuestion = this.addQuestion.bind(this);
        this.addChoice = this.addChoice.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeChoice = this.handleChangeChoice.bind(this);
        this.setTimer = this.setTimer.bind(this);
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
        let items = this.state.content;
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
        let id = event.target.id.split("-");
        let idQuestion = "q-" + id[1];
        let value = event.target.value;
        let items = this.state.content;
        for(let item in items) {
            if(items[item].id === idQuestion) {
                items[item].choice[id[2]].res = value;
                break;
            }
        }
        this.setState({content: items});
    }

    deleteQuestion(id) {
        let stringId = id.split('-');
        let items = this.state.content;
        items[parseInt(stringId[1])].splice(parseInt(stringId[1]), 1);
        this.setState({content: items});
    }

    //Ajoute une question au questionnaire
    addQuestion() {
        let list = this.state.content;
        let lastNum = list[list.length - 1].number;
        lastNum += 1;
        list.push({
            id: "q-" + lastNum.toString(),
            number: lastNum,
            question: "",
            response: '',
            choice: [{letter: "A", res: "", pos: 0}, {letter: "B", res: "", pos: 1}]
        });
        this.setState({content: list});
    }

    //Ajoute un choix à la question donnée
    addChoice(id) {
        let items = this.state.content;
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
                this.setState({content: items});
            }
        }
    }

    handleSubmit(e) {
        console.log(this.state);
        axios.post("http://localhost:5000/api/quiz/create", this.state)
            .then((response) => {
                console.log("Post success !");
                toast.success('Quiz créé avec succès !');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    setTitle(event) {
        this.setState({title: event.target.value});
    }

    setTimer(event) {
        let value = event.target.value;
        console.log(value);
        if(Number.isInteger(parseInt(value)) && value > 0) {
            this.setState({limitTime: parseInt(value)});
        }
        else if(value == "" || (Number.isInteger(parseInt(value)) && parseInt(value) == 0)) {
            this.setState({limitTime: null});
        }
        else {
            toast.error('La valeur entrée est incorrect !');
        }
    }

    handleChangeQuestion = (event) => {
        let value = event.target.value;
        let items = this.state.content;
        for(let item in items) {
            if(items[item].id === event.target.id) {
                items[item].question = value;
                break;
            }
        }
        this.setState({content: items});
    }

    handleChangeChoice = (event) => {
        let value = event.target.value;
        let items = this.state.content;
        let idString = event.target.name.split("-");
        let id = idString[1];
        items[id].response = value;
        this.setState({content: items});
    }

    render() {
        return(
            <div>
                <section className='create-quiz'>
                    <form id="quiz-form" onSubmit={this.handleSubmit}>
                        <h2>Quiz creator</h2>
                        
                        <input type="button" className='btn btn-primary' onClick={this.handleSubmit} value="Envoyer" /><br />
                        <input type="button" className='btn btn-primary' onClick={this.addQuestion} value="Ajouter question" /><br />
                        <label>Temps du décompte (pas de valeur ou 0 = pas de limite de temps) : </label>
                        <input type='text' className='input' onChange={this.setTimer} placeholder="Temps en seconde" />
                        <h1>{this.state.title}</h1>
                        <input type='text' className='input' onChange={this.setTitle} required placeholder="Titre du Questionnaire" />
                        {this.state.content.map((item) => (
                            <div id={item.id} key={item.number}>
                                <h3>{item.question}</h3>
                                <input id={item.id} className="input" type="text" required placeholder='Question' onChange={this.handleChangeQuestion} />
                                {item.choice.map((res) => (
                                    <div key={1000 + res.pos}>
                                        <label className="ques">Réponse {res.letter} : </label>
                                        <input type="radio" value={res.pos} name={item.id} required onChange={this.handleChangeChoice} />
                                        <input id={item.id + '-' + res.pos.toString()} className="input" required type="text" onChange={this.handleChange}></input>
                                        <input type="button" id={item.id + '-' + res.pos.toString()} className="cross-btn bi bi-x" onClick={this.deleteChoice} value="X" />
                                    </div>
                                ))}
                                <input type='button' className="btn btn-primary" onClick={() => this.addChoice(item.id)} value="Ajouter une réponse" />
                                <input type='button' className="btn btn-outline-danger" onClick={() => this.deleteQuestion(item.id)} value="Supprimer" />
                            </div>
                        ))}
                        <input className='btn btn-primary' type="submit"  value="Envoyer" />
                    </form>
                </section>
                
            </div>
        )
    }
}

/*function VerifyIfAdmin() {
    const { user, token, isLoading } = useContext(AuthContext);

    useEffect(() => {
        if(user) {
            if(user.status !== "admin") {
                window.location.href = "/";
            }
        }
    }, [user]);
    
    return (<></>);
}*/