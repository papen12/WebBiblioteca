import './sideBar.css';
import type { FC } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>Bienvenido, {username}</h3>
                </div>
                <nav className="sidebar-menu">
                    <ul>
                        {items.map((item) => (
                            <li 
                                key={item.id} 
                                className="sidebar-item"
                                onClick={() => handleItemClick(item)}
                            >
                                {item.icon && (
                                    <span className="sidebar-icon">
                                        <FontAwesomeIcon icon={item.icon} />
                                    </span>
                                )}
                                <span className="sidebar-label">{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
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