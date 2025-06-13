import  { useState, useEffect } from 'react';
import type { FC } from 'react';
import AutorCard from '../cardAutor/AutorCard';
import { AutorService } from '../../services/AutorService';
import type { Autor } from '../../../../backend/Models/Autor';
import './AutorCatalogo.css';

const AutorCatalogo: FC = () => {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroNombre, setFiltroNombre] = useState<string>('');

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const autoresData = await AutorService.getAll();
        setAutores(autoresData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    cargarDatosIniciales();
  }, []);

  useEffect(() => {
    const filtrarAutores = async () => {
      try {
        setLoading(true);
        setError(null);
        let autoresFiltrados: Autor[] = [];

        if (filtroNombre) {
          try {
            autoresFiltrados = await AutorService.getByNombre(filtroNombre);
            if (autoresFiltrados.length === 0) {
              setError(`No se encontraron autores con el nombre "${filtroNombre}"`);
            }
          } catch (err) {
            if (err instanceof Error && err.message.includes('404')) {
              setAutores([]);
              setError(`No se encontraron autores con el nombre "${filtroNombre}"`);
            } else {
              throw err;
            }
          }
        } else {
          autoresFiltrados = await AutorService.getAll();
        }

        setAutores(autoresFiltrados);
      } catch (err) {
        if (!(err instanceof Error && err.message.includes('404'))) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      filtrarAutores();
    }, 500);

    return () => clearTimeout(timer);
  }, [filtroNombre]);

  const handleResetFiltros = () => {
    setFiltroNombre('');
    setError(null);
  };

  if (loading) return <div className="loading">Cargando catálogo...</div>;
  
  return (
    <div className="autor-catalogo-container">
      <div className="filtros-container">
        <div className="filtro-group">
          <label htmlFor="filtro-nombre">Buscar por nombre:</label>
          <input
            id="filtro-nombre"
            type="text"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            placeholder="Ingrese nombre del autor..."
          />
        </div>

        <button 
          className="reset-btn"
          onClick={handleResetFiltros}
          disabled={!filtroNombre && !error}
        >
          Reiniciar filtros
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="autores-grid">
        {autores.length > 0 ? (
          autores.map((autor) => <AutorCard key={autor.idAutor} autor={autor} />)
        ) : (
          !error && <div className="no-results">No se encontraron autores</div>
        )}
      </div>
    </div>
  );
};

export default AutorCatalogo;