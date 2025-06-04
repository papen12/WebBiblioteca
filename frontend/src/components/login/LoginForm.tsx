import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import { fetchApi } from "../../services/api"; 
import { LogIn } from "lucide-react";
import logazo from "../../assets/logazo.png"

const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navItems=[
    
  ]


  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!usuario || !password) {
      setMensaje("Campos requeridos");
      return;
    }

    try {
      const data = await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify({ usuario, password }),
      });

      localStorage.setItem("token", data.token);
      navigate("/perfil");
    } catch (error: any) {
      setMensaje(error.message || "Error de autenticación");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
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
      <Button handleClick={handleSubmit}>Ingresar</Button>
    </div>
  );
};

export default LoginForm;
