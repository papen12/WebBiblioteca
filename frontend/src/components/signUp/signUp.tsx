import React, { useState } from "react";
import type { SignUpData } from "../../services/SignUpService";
import { signUpService} from "../../services/SignUpService";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import './signUp.css'

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
        {loading ? "Creando..." : "Crear Cliente"}
      </Button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default SignUp;
