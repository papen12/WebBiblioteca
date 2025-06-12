import { useState, useEffect } from 'react';
import type { FC } from 'react';
import LibroCard from './LibroCard';
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
        let librosFiltrados: Libro[] = [];

        if (filtroTitulo) {
          librosFiltrados = await LibroService.getByTitulo(filtroTitulo);
        } else if (filtroGenero) {
          librosFiltrados = await LibroService.getByGenero(filtroGenero);
        } else {
          librosFiltrados = await LibroService.getAll();
        }

        setLibros(librosFiltrados);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
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
  };

  if (loading) return <div className="loading">Cargando catálogo...</div>;
  if (error) return <div className="error">Error: {error}</div>;

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
          disabled={!filtroTitulo && !filtroGenero}
        >
          Reiniciar filtros
        </button>
      </div>

      <div className="libros-grid">
        {libros.length > 0 ? (
          libros.map((libro) => <LibroCard key={libro.idLibro} libro={libro} />)
        ) : (
          <div className="no-results">No se encontraron libros con los filtros aplicados</div>
        )}
      </div>
    </div>
  );
};

export default LibroCatalogo;