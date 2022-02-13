import React, { Component } from 'react';

export default class CreateQuizz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "quizz": true
        };
    }

    render() {
        return(
            <div>
                <form>
                    <label>Premier quiz</label>
                    <input type="text"></input> 
                </form>
            </div>
        )
    }
}