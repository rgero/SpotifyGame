import React, { Component } from 'react';
import '../styles/Button.css';
import '../styles/Scoreboard.css';

class Scoreboard extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            correctAnswers: 0,
            wrongAnswers: 0
        }; 

        this.addScore = this.addScore.bind(this);
    }

    addScore(correct) {
        if (correct)
        {
            let correct = this.state.correctAnswers;
            this.setState({correctAnswers: correct+1})
        } else {
            let wrong = this.state.wrongAnswers;
            this.setState({wrongAnswers: wrong+1})
        }
    }

    render() {
        return (
            <div className="scoreboard">
                <div onClick={()=>{this.addScore(false)}} className="wrongButton">
                    Wrong
                </div>
                <div>{this.state.wrongAnswers} - {this.state.correctAnswers}</div>
                <div onClick={()=>{this.addScore(true)}} className="correctButton">
                    Correct
                </div>
            </div>
        )
    }
}

export default Scoreboard