import React from "react";
import "../../styles/Spotify/Player.css";

class Player extends React.Component
{
  constructor(props)
  {
    super(props);

    this.backgroundStyles = {
      backgroundImage:`url(${this.props.item.album.images[0].url})`,
    };

    this.progressBarStyles = {
      width: (this.props.progress_ms * 100 / this.props.item.duration_ms) + '%'
    };
  }

  render() {
      return (
        <div className="SpotifyPlayer">
          <div className="main-wrapper">
            <div className="now-playing__img">
              <img src={this.props.item.album.images[0].url} />
            </div>
          </div>
          <div className="now-playing_text">
              <div className="now-playing__name">{this.props.item.name}</div>
              <div className="now-playing__artist">
                {this.props.item.artists[0].name}
              </div>
          </div>
        </div>
      );
  }
}

export default Player;