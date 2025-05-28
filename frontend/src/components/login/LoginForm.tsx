import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";

const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!usuario || !password) {
      setMensaje("Campos requeridos");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || "Error de autenticación");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/perfil");
    } catch (error) {
      setMensaje("Error de red");
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
