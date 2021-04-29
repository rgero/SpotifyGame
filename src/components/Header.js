import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className="header">
        <h1 className="header__title">The Spotify Game!</h1>
        <p className="header__subtitle">Let's see how well you know your own library</p>
    </div>
  )
}

export default Header;