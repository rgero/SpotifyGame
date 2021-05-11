import React, { Component } from "react";
import {connect} from 'react-redux';
import * as $ from "jquery";
import Player from "./Player";
import "../../styles/SpotifyWrapper.css";

class SpotifyWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.token ? props.token : "",
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.tick = this.tick.bind(this);
  }



  componentDidMount() {
    this.getCurrentlyPlaying(this.state.token);

    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    if(this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
    }
  }


  getCurrentlyPlaying(token) {
    // We want to keep the token input variable for the initial push.
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
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

  render() {
    return (
      <div className="SpotifyWrapper">
        <header className="SpotifyWrapper-header">
          {this.state.token && !this.state.no_data && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.state.progress_ms}
            />
          )}
          {this.state.no_data && (
            <p>
              You need to be playing a song on Spotify, for something to Play here.
            </p>
          )}
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
    return {
        token: state.spotify.token
    };
}

export default connect(mapStateToProps)(SpotifyWrapper);