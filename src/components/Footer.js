import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <nav className="footer">
      <div className="footer__grid-container">
        <div className="footer__grid-1">
          <a className='github__links__creator' href='https://www.linkedin.com/in/david-griffin-117b0045/' target="_blank" rel="noreferrer">
            <span className="footer__span__names">
            <img alt="github" src='https://image.flaticon.com/icons/png/512/174/174857.png' width="30" height="30" /><span>David Griffin</span>
            </span>
          </a>
        </div>
        <div className="footer__grid-5">
          <a className='github__links' href='https://github.com/davidleegriffin/Blackjack' target="_blank" rel="noreferrer">
            <span className="footer__span__repo">
              <img className="footer__img__repo" alt="github" src='https://miro.medium.com/max/1620/1*FsqitFvksKYy8Lu3jCQR9w.png' width="150" height="50"/>
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Footer;