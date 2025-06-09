import React, { useState } from "react";
import type { SignUpData } from "../../services/SignUpService";
import { signUpService} from "../../services/SignUpService";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import './signUp.css'
import { NavBar } from "../navBar/navBar";
import logazo from "../../assets/logazo.png"
import { faHome, faBook, faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpData>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    genero: "",
    ci_cliente: "",
    usuario: "",
    password: "",
  });
  const navItems=[
          { id: '1', label: 'Inicio', href: '/', icon: faHome },
          { id: '2', label: 'Catálogo', href: '/catalogo', icon: faBook },
          { id: '4', label: 'Registrarse', href: '/signUp', icon: faUser },
          { id: '5', label: 'Iniciar Sesion', href: '/login', icon: faInfoCircle },
    ]

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof SignUpData) => (
    value: string | boolean | number | Date
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setMessage(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await signUpService(formData);
      setMessage(response.message || "Cliente creado exitosamente");
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        genero: "",
        ci_cliente: "",
        usuario: "",
        password: "",
      });
    } catch (err: any) {
      setError(err.message || "Error al crear cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <NavBar
      items={navItems}
      logo={logazo}
      logoAlt="Logo de la aplicacion">
      </NavBar>
      <div className="signUp-container">
      <form onSubmit={handleSubmit} className="signup-form">
      <Input
        placeholder="Nombre"
        type="text"
        value={formData.nombre}
        handleInput={handleInputChange("nombre")}
        resetMessage={() => {}}
      />
      <Input
        placeholder="Apellido"
        type="text"
        value={formData.apellido}
        handleInput={handleInputChange("apellido")}
        resetMessage={() => {}}
      />
      <Input
        placeholder="Email"
        type="email"
        value={formData.email}
        handleInput={handleInputChange("email")}
        resetMessage={() => {}}
      />
      <Input
        placeholder="Teléfono"
        type="tel"
        value={formData.telefono}
        handleInput={handleInputChange("telefono")}
        resetMessage={() => {}}
      />
      <Input
        placeholder="Dirección"
        type="text"
        value={formData.direccion}
        handleInput={handleInputChange("direccion")}
        resetMessage={() => {}}
      />
      <Input
        placeholder="Género"
        type="text"
        value={formData.genero}
        handleInput={handleInputChange("genero")}
        resetMessage={() => {}}
      />
      <Input
        placeholder="CI Cliente"
        type="text"
        value={formData.ci_cliente}
        handleInput={handleInputChange("ci_cliente")}
        resetMessage={() => {}}
      />
      <Input
        placeholder="Usuario"
        type="text"
        value={formData.usuario}
        handleInput={handleInputChange("usuario")}
        resetMessage={() => {}}
      />
      <Input
        placeholder="Contraseña"
        type="password"
        value={formData.password}
        handleInput={handleInputChange("password")}
        resetMessage={() => {}}
      />

      <Button handleClick={() => {}} disabled={loading}>
        {loading ? "Creando..." : "Crear Cuenta"}
      </Button>

      {message && <p style={{ color: "White" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
    </div>
    </>
    
  );
};

export default SignUp;
