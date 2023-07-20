import React from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Header() {
  return (
    <header className="header">
      <h1 className="title">d4drops</h1>
      <a href="https://github.com/Mythically" className="link">
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </header>
  );
}

export default Header;