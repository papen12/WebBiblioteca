import type { FC } from 'react';
import { useState } from 'react';
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
          <img src={logo} alt={logoAlt} width="40" height="40" />
          <h1>Biblioverso</h1>
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
            <a
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon && (
                <FontAwesomeIcon
                  icon={item.icon}
                  className="navbar-icon"
                />
              )}
              <span className="navbar-label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};