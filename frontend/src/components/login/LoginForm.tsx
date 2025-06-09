import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import { fetchApi } from "../../services/api"; 
import logazo from "../../assets/logazo.png"
import { faHome, faBook, faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { NavBar } from "../navBar/navBar";
import './login.css'; 

const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navItems = [
    { id: '1', label: 'Inicio', href: '/', icon: faHome },
    { id: '2', label: 'Catálogo', href: '/catalogo', icon: faBook },
    { id: '4', label: 'Registrarse', href: '/signUp', icon: faUser },
    { id: '5', label: 'Iniciar Sesion', href: '/login', icon: faInfoCircle },
  ];
  
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    if (!usuario || !password) {
      setMensaje("Campos requeridos");
      return;
    }

    setLoading(true);
    setMensaje("");

    try {
      const data = await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify({ usuario, password }),
      });

      localStorage.setItem("token", data.token);
      navigate("/perfil");
    } catch (error: any) {
      setMensaje(error.message || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <NavBar
        items={navItems}
        logo={logazo}
        logoAlt="Logo de la aplicacion"
      />
      <div className="login-content">
        <div className="login-form">
          <h2>Iniciar Sesión</h2>
          <p className="welcome-text">Ingresa tus credenciales para acceder</p>
          
          {mensaje && <p>{mensaje}</p>}
          
          <Input
            type="text"
            placeholder="Usuario"
            value={usuario}
            handleInput={setUsuario}
            resetMessage={() => setMensaje("")}
          />
          
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            handleInput={setPassword}
            resetMessage={() => setMensaje("")}
          />
          
          <Button handleClick={handleSubmit} disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
          
          <div className="forgot-password">
            <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          </div>
          
          <div className="signup-link">
            ¿No tienes cuenta?
            <a href="/signUp">Regístrate aquí</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;