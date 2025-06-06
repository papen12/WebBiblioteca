import './Home.css';
import type { FC } from 'react'; 
import { NavBar } from '../../components/navBar/navBar';
import Hero from '../../components/hero/Hero';
import { faHome, faBook, faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logazo.png'; 
//import Footer from '../../components/footer/footer';

export const Home: FC = () => {
  const navItems = [
    { id: '1', label: 'Inicio', href: '/', icon: faHome },
    { id: '2', label: 'Catálogo', href: '/catalogo', icon: faBook },
    { id: '4', label: 'Registrarse', href: '/signUp', icon: faUser },
    { id: '5', label: 'Iniciar Sesion', href: '/login', icon: faInfoCircle },
  ];

  return (
    <div className="home-container">
      <NavBar
        items={navItems}
        logo={logo}
        logoAlt="Logo de la aplicación"
        className="home-navbar"
      />
      <Hero></Hero>
      
    </div>
  );
};