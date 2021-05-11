import React from 'react';
import {CSSTransition} from 'react-transition-group';
import '../styles/GameWindow.css';
import '../styles/Transitions.css';
import '../styles/Button.css';

import SpotifyWrapper from './SpotifyPlayer/SpotifyWrapper';
import Scoreboard from './Scoreboard';

const GameWindow = () => {
  const [extended, setState] = React.useState(true);
  return (
      <div className="container">
          <CSSTransition
            in={extended}
            timeout={300}
            classNames="spotifyWrapper"
          >
            <div className="GameWindow">
              <SpotifyWrapper/>
              <Scoreboard/>
            </div>
          </CSSTransition>
          <div onClick={()=>{setState(!extended)}} className="toggleButton">
            {extended ? <div>Hide Display</div> : <div>Show Display</div>}
          </div>
      </div>
  )
}

export default GameWindow;
