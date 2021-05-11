import React, { Component } from 'react';
import * as $ from "jquery";
import '../styles/Button.css';
import '../styles/Scoreboard.css';

class Scoreboard extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            correctAnswers: 0,
            wrongAnswers: 0,
        }; 

        this.addScore = this.addScore.bind(this);
        this.playNextTrack = this.playNextTrack.bind(this);
    }

    playNextTrack(token){
        $.ajax({
            url: "https://api.spotify.com/v1/me/player/next",
            type: "POST",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                if(!data) {
                    this.setState({
                        no_data: true,
                    });
                    return;
                }

                this.setState({
                    item: data.item,
                    is_playing: data.is_playing,
                    progress_ms: data.progress_ms,
                    no_data: false
                });
            }
        });

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

        // Push to next track.
        console.log(this.state);
        this.playNextTrack(this.state.token);
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

export default Scoreboard;