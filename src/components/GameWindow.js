import React from 'react';
import {CSSTransition} from 'react-transition-group';
import '../styles/GameWindow.css';

import SpotifyWrapper from './SpotifyWrapper'

const GameWindow = () => {
  const [extended, setState] = React.useState(true);
  return (
    <>
      <div className="GameWindow">
          <CSSTransition
            in={extended}
            timeout={300}
            classNames="spotifyWrapper"
          >
            <SpotifyWrapper/>
          </CSSTransition>
          <div onClick={()=>{setState(!extended)}} className="toggleButton">
            Toggle Display
          </div>
      </div>
    </>
  )
}

export default GameWindow;
