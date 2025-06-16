import React, { useState } from "react";
import { AutorService } from "../../services/AutorService";
import type { Autor } from "../../../../backend/Models/Autor";

export const AutorBuscarPorNombre: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [resultados, setResultados] = useState<Autor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const buscar = async () => {
    setError(null);
    setCargando(true);
    try {
      const autores = await AutorService.getByNombre(nombre);
      setResultados(autores);
    } catch (e: any) {
      setError(e.message || "Error al buscar autores");
      setResultados([]);
    }
    setCargando(false);
  };

  return (
    <div>
      <h1>Buscar Autor por Nombre</h1>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Escribe el nombre del autor"
      />
      <button onClick={buscar} disabled={!nombre.trim()}>
        Buscar
      </button>

      {cargando && <p>Cargando...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {resultados.length > 0 ? (
        <ul>
          {resultados.map((autor) => (
            <li key={autor.idAutor}>
              {autor.nombre} (ID: {autor.idAutor})
            </li>
          ))}
        </ul>
      ) : (
        !cargando && <p>No se encontraron autores.</p>
      )}
    </div>
  );
};
