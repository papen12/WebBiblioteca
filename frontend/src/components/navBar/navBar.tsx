import type {FC} from 'react'
import {  useState } from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import imgBib from '../../assets/logazo.png';
import type { NavBarProps, NavItem } from '../types/list';

export const NavBar: FC<NavBarProps> = ({
  items,
  logo = imgBib,
  logoAlt = "Logo",
  className = ""
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`navbar ${className}`}>
      <div className="navbar-header">
        <div className="navbar-logo">
          <div className="logo-container">
            <img src={logo || "/placeholder.svg"} alt={logoAlt} width="45" height="45" />
            <div className="logo-glow"></div>
          </div>
          <div className="brand-text">
            <h1>Biblioverso</h1>
            <span className="brand-subtitle">Biblioteca Universal</span>
          </div>
        </div>
        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>
      <ul className={`navbar-list ${isMenuOpen ? 'open' : ''}`}>
        {items.map((item: NavItem) => (
          <li key={item.id} className="navbar-item">
            <Link
              to={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="navbar-link"
            >
              {item.icon && (
                <FontAwesomeIcon icon={item.icon} className="navbar-icon" />
              )}
              <span className="navbar-label">{item.label}</span>
              <div className="link-glow"></div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};