import type { FC } from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaYoutube } from 'react-icons/fa';

const Footer: FC = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="#">La mejor</a>
                <a href="#">Biblioteca</a>
                <a href="#">de todo</a>
                <a href="#">SUCRE</a>
                <a href="#">WEb</a>
            </div>

            <div className="footer-social">
                <FaFacebookF />
                <FaInstagram />
                <FaTwitter />
                <FaEnvelope />
                <FaYoutube />
            </div>

            <button className="footer-lang">HOLA</button>

            <div className="footer-copy">
                Copyright © Bilio Verso, Inc.
            </div>
        </footer>
    );
};

export default Footer;
