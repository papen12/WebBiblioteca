import './sideBar.css';
import type { FC } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import type { SideBarProps ,SideBarItem} from '../types/sideBar';

export const SideBar: FC<SideBarProps> = ({
    username,
    items,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    
    const handleItemClick = (item: SideBarItem) => {
        item.onClick?.();
        if (isOpen) toggleSidebar(); 
    };
    
    return (
        <div className={`sidebar-container ${className}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                <span className="toggle-glow"></span>
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="user-avatar">
                        <FontAwesomeIcon icon={faUser} className="avatar-icon" />
                        <div className="avatar-glow"></div>
                    </div>
                    <div className="user-info">
                        <h3 className="welcome-text">Bienvenido</h3>
                        <span className="username">{username}</span>
                    </div>
                </div>
                <nav className="sidebar-menu">
                    <ul>
                        {items.map((item, index) => (
                            <li 
                                key={item.id} 
                                className="sidebar-item"
                                onClick={() => handleItemClick(item)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="item-content">
                                    {item.icon && (
                                        <span className="sidebar-icon">
                                            <FontAwesomeIcon icon={item.icon} />
                                        </span>
                                    )}
                                    <span className="sidebar-label">{item.label}</span>
                                </div>
                                <div className="item-glow"></div>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <div className="footer-decoration"></div>
                </div>
            </aside>
            {isOpen && (
                <div 
                    className="sidebar-overlay" 
                    onClick={toggleSidebar}
                    role="button"
                    aria-label="Cerrar menú"
                    tabIndex={0}
                />
            )}
        </div>
    );
};