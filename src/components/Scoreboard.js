import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as $ from "jquery";
import '../styles/Button.css';
import '../styles/Scoreboard.css';
import { setExtended } from '../actions/spotify';

class Scoreboard extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            token: props.token ? props.token : "",
            correctAnswers: 0,
            wrongAnswers: 0,
        }; 

        this.addScore = this.addScore.bind(this);
        this.startNextTrack = this.startNextTrack.bind(this);
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

        this.startNextTrack();
    }

    startNextTrack(){
        $.ajax({
            url: "https://api.spotify.com/v1/me/player/next",
            type: "POST",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
            },
            success: data => {
                console.log("Yay");
            }
        });
        this.props.setExtended(false);
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

const mapDispatchToProps = (dispatch) => {
    return {
        setExtended: (extended) => { 
            dispatch(setExtended(extended))
        },
    }
}

const mapStateToProps = (state, props) => {
    return {
        token: state.spotify.token
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);