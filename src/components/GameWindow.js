import React from 'react';
import {connect} from 'react-redux';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
import { setToken, setExtended } from "../actions/spotify";
import hash from "../helpers/hash";
import '../styles/GameWindow.css';
import '../styles/Button.css';

import SpotifyWrapper from './SpotifyPlayer/SpotifyWrapper';
import Scoreboard from './Scoreboard';

class GameWindow extends React.Component {

  constructor(props)
  {
    super(props)

    this.toggleDisplay = this.toggleDisplay.bind(this);

    this.state = {
      token: props.token ? props.token : "",
      extended: props.extended ? props.extended : false
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

  toggleDisplay()
  {
    this.props.setExtended(!this.state.extended);
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
                  <div className={this.state.extended ? "GameWindow" : "GameWindow_Hidden"}>
                    <SpotifyWrapper/>
                    <Scoreboard/>
                  </div>
                <div onClick={this.toggleDisplay} className="toggleButton">
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
        setExtended: (extended) => { 
            dispatch(setExtended(extended))
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        token: state.spotify.token,
        extended: state.spotify.extended
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameWindow);
