import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/button/Button";
import { fetchApi } from "../../services/api";

const Perfil = () => {
  const [cliente, setCliente] = useState<any>(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

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
    <div>
      <h2>Perfil</h2>
      <p>
        <strong>CI:</strong> {cliente.ci_cliente}
      </p>
      <p>
        <strong>Usuario:</strong> {cliente.usuario}
      </p>
      <Button handleClick={logout}>Cerrar sesión</Button>
    </div>
  );
};

export default Perfil;
