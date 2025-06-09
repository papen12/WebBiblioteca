import type { FC } from 'react';
import "./footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">La Mejor </a>
        <a href="#">BiBlioteca</a>
        <a href="#">De</a>
        <a href="#">Todo</a>
        <a href="#">Sucre</a>
      </div>

      <div className="footer-social">
        <FontAwesomeIcon icon={faFacebookF} />
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faEnvelope} />
        <FontAwesomeIcon icon={faYoutube} />
      </div>

      <button className="footer-lang">English</button>

      <div className="footer-copy">
        Copyright © CyberAgent, Inc.
      </div>
    </footer>
  );
};

export default Footer;
