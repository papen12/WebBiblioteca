import { useState, useEffect } from 'react';
import type { FC } from 'react';
import LibroCard from '../cardLibro/LibroCard';
import { LibroService } from '../../services/LibroService';
import type { Libro } from '../../../../backend/Models/Libro';
import './LibroCatalogo.css';

const LibroCatalogo: FC = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroTitulo, setFiltroTitulo] = useState<string>('');
  const [filtroGenero, setFiltroGenero] = useState<string>('');
  const [generosDisponibles, setGenerosDisponibles] = useState<string[]>([]);

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const librosData = await LibroService.getAll();
        setLibros(librosData);
        const generos = [...new Set(librosData.map(libro => libro.genero))] as string[];
        setGenerosDisponibles(generos);
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
    const filtrarLibros = async () => {
      try {
        setLoading(true);
        setError(null);
        let librosFiltrados: Libro[] = [];

        if (filtroTitulo) {
          try {
            librosFiltrados = await LibroService.getByTitulo(filtroTitulo);
            if (librosFiltrados.length === 0) {
              setError(`No se encontraron libros con el título "${filtroTitulo}"`);
            }
          } catch (err) {
            if (err instanceof Error && err.message.includes('404')) {
              setLibros([]);
              setError(`No se encontraron libros con el título "${filtroTitulo}"`);
            } else {
              throw err;
            }
          }
        } else if (filtroGenero) {
          try {
            librosFiltrados = await LibroService.getByGenero(filtroGenero);
            if (librosFiltrados.length === 0) {
              setError(`No se encontraron libros del género "${filtroGenero}"`);
            }
          } catch (err) {
            if (err instanceof Error && err.message.includes('404')) {
              setLibros([]);
              setError(`No se encontraron libros del género "${filtroGenero}"`);
            } else {
              throw err;
            }
          }
        } else {
          librosFiltrados = await LibroService.getAll();
        }

        setLibros(librosFiltrados);
      } catch (err) {
        if (!(err instanceof Error && err.message.includes('404'))) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      filtrarLibros();
    }, 500);

    return () => clearTimeout(timer);
  }, [filtroTitulo, filtroGenero]);

  const handleResetFiltros = () => {
    setFiltroTitulo('');
    setFiltroGenero('');
    setError(null);
  };

  if (loading) return <div className="loading">Cargando catálogo...</div>;

  return (
    <div className="libro-catalogo-container">
      <div className="filtros-container">
        <div className="filtro-group">
          <label htmlFor="filtro-titulo">Buscar por título:</label>
          <input
            id="filtro-titulo"
            type="text"
            value={filtroTitulo}
            onChange={(e) => {
              setFiltroTitulo(e.target.value);
              setFiltroGenero(''); 
            }}
            placeholder="Ingrese título..."
          />
        </div>

        <div className="filtro-group">
          <label htmlFor="filtro-genero">Filtrar por género:</label>
          <select
            id="filtro-genero"
            value={filtroGenero}
            onChange={(e) => {
              setFiltroGenero(e.target.value);
              setFiltroTitulo('');
            }}
          >
            <option value="">Todos los géneros</option>
            {generosDisponibles.map((genero) => (
              <option key={genero} value={genero}>
                {genero}
              </option>
            ))}
          </select>
        </div>

        <button 
          className="reset-btn"
          onClick={handleResetFiltros}
          disabled={!filtroTitulo && !filtroGenero && !error}
        >
          Reiniciar filtros
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="libros-grid">
        {libros.length > 0 ? (
          libros.map((libro) => <LibroCard key={libro.idLibro} libro={libro} />)
        ) : (
          !error && <div className="no-results">No se encontraron libros</div>
        )}
      </div>
    </div>
  );
};

export default LibroCatalogo;