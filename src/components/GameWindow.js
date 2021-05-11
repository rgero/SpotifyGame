import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
import { setToken } from "../actions/spotify";
import hash from "../helpers/hash";
import '../styles/GameWindow.css';
import '../styles/Transitions.css';
import '../styles/Button.css';

import SpotifyWrapper from './SpotifyPlayer/SpotifyWrapper';
import Scoreboard from './Scoreboard';

class GameWindow extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      token: props.token ? props.token : "",
      extended: props.extended ? props.extended : true
    }
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.props.setToken(_token);
      this.setState({
        token: _token
      });
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.extended !== prevProps.extended)
    {
      this.setState({
        extended: this.props.extended
      })
    }
  }

  render(){
    return (
        <div className="container">
            {!this.state.token && (
                <a
                  className="loginSpotify"
                  href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                    "%20"
                  )}&response_type=token&show_dialog=true`}
                >
                  Login to Spotify
                </a>
            )}
            {this.state.token && (
              <div>
                <CSSTransition
                  in={this.state.extended}
                  timeout={300}
                  classNames="spotifyWrapper"
                >
                  <div className="GameWindow">
                    <SpotifyWrapper/>
                    <Scoreboard/>
                  </div>
                </CSSTransition>
                <div onClick={()=>{this.setState({extended: !this.state.extended})}} className="toggleButton">
                  {this.state.extended ? <div>Hide Display</div> : <div>Show Display</div>}
                </div>
              </div>
            )}
        </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => { 
            dispatch(setToken(token))
        },
    }
}

const mapStateToProps = (state, props) => {
    return {
        token: state.spotify.token,
        extended: state.spotify.extended
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameWindow);
