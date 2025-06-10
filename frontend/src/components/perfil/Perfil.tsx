import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/button/Button";
import { fetchApi } from "../../services/api";
import { NavBar } from "../navBar/navBar";
import logo from '../../assets/logazo.png'; 
import { faHome, faBook, faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { SideBar } from "../sideBar/sideBar";
import './Perfil.css'

const Perfil = () => {
  const [cliente, setCliente] = useState<any>(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  
  const navItems = [
    { id: '1', label: 'Inicio', href: '/', icon: faHome },
    { id: '2', label: 'Catálogo', href: '/catalogo', icon: faBook },
    { id: '4', label: 'Registrarse', href: '/signUp', icon: faUser },
    { id: '5', label: 'Iniciar Sesion', href: '/login', icon: faInfoCircle },
  ];
  const sideBarItems = [
    { id: '1', label: 'Mi Perfil', icon: faUser },
    { id: '2', label: 'Mis Pedidos' },
    { id: '3', label: 'Configuración' },
    { id: '4', label: 'Cerrar Sesión', icon: faInfoCircle },
  ];

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await fetchApi("/auth/perfil");
        setCliente(data.cliente);
      } catch (error: any) {
        setMensaje(error.message || "No autorizado");
      }
    };

    fetchPerfil();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (mensaje) return <p>{mensaje}</p>;
  if (!cliente) return <p>Cargando...</p>;

  return (
    <div className="page-container">
      <NavBar
        items={navItems}
        logo={logo}
        logoAlt="Logo de la aplicación"
        className="home-navbar"
      />
      
      <div className="content-container">
        <SideBar 
          username={cliente.usuario} 
          items={sideBarItems} 
        />
        
        <main className="main-content">
          <h2>Perfil</h2>
          <p>
            <strong>CI:</strong> {cliente.ci_cliente}
          </p>
          <p>
            <strong>Usuario:</strong> {cliente.usuario}
          </p>
          <Button handleClick={logout}>Cerrar sesión</Button>
        </main>
      </div>
    </div>
  );
};

export default Perfil;