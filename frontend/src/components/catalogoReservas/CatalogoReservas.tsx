import { useState, useEffect } from 'react';
import type { FC } from 'react';
import LibroCard from '../cardLibro/LibroCard';
import { ReservaService } from '../../services/ReservaService';
import type { Libro } from '../../../../backend/Models/Libro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFolder, 
  faSyncAlt, 
  faExclamationTriangle, 
  faCheck, 
  faBook, 
  faSpinner,
  faCalendarAlt,
  faBookBookmark
} from '@fortawesome/free-solid-svg-icons';
import './CatalogoReservas.css';

interface ReservaCatalogoProps {
  ciCliente: string;
}

const ReservaCatalogo: FC<ReservaCatalogoProps> = ({ ciCliente }) => {
  const [librosDisponibles, setLibrosDisponibles] = useState<Libro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filtroTitulo, setFiltroTitulo] = useState<string>('');
  const [filtroGenero, setFiltroGenero] = useState<string>('');
  const [generosDisponibles, setGenerosDisponibles] = useState<string[]>([]);

  useEffect(() => {
    const cargarLibrosDisponibles = async () => {
      try {
        setLoading(true);
        const libros = await ReservaService.getLibrosDisponibles();
        setLibrosDisponibles(libros);
        
        const generos = [...new Set(libros.map(libro => libro.genero))];
        setGenerosDisponibles(generos);
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar libros disponibles');
      } finally {
        setLoading(false);
      }
    };

    cargarLibrosDisponibles();
  }, []);

  useEffect(() => {
    const filtrarLibros = () => {
      try {
        let librosFiltrados = [...librosDisponibles];
        
        if (filtroTitulo) {
          librosFiltrados = librosFiltrados.filter(libro =>
            libro.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
          );
        }
        
        if (filtroGenero) {
          librosFiltrados = librosFiltrados.filter(libro =>
            libro.genero === filtroGenero
          );
        }
        
        return librosFiltrados;
      } catch (err) {
        throw err;
      }
    };

    const timer = setTimeout(() => {
      try {
        const librosFiltrados = filtrarLibros();
        setLibrosDisponibles(librosFiltrados);
        if (librosFiltrados.length === 0 && (filtroTitulo || filtroGenero)) {
          setError('No se encontraron libros con los filtros aplicados');
        } else {
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al filtrar libros');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [filtroTitulo, filtroGenero, librosDisponibles]);

  const handleReservarLibro = async (idLibro: number) => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      
      const resultado = await ReservaService.crearReservaDirecta(idLibro, ciCliente);
      
      if (resultado.success) {
        setSuccessMessage(`Reserva #${resultado.data.idReserva} creada exitosamente`);
        const librosActualizados = await ReservaService.getLibrosDisponibles();
        setLibrosDisponibles(librosActualizados);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la reserva');
    } finally {
      setLoading(false);
    }
  };

  const handleResetFiltros = () => {
    setFiltroTitulo('');
    setFiltroGenero('');
    setError(null);
  };

  if (loading) {
    return (
      <div className="reserva-catalogo-container">
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          <p>Cargando libros disponibles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reserva-catalogo-container">
      <div className="header-section">
        <h1 className="catalog-title">
          <FontAwesomeIcon icon={faBookBookmark} className="title-icon" /> Reserva de Libros
        </h1>
        <p className="catalog-subtitle">Selecciona un libro disponible para reservar</p>
      </div>

      <div className="filtros-container">
        <div className="filtros-content">
          <div className="filtro-group">
            <label htmlFor="filtro-titulo">
              <FontAwesomeIcon icon={faSearch} className="label-icon" />
              Buscar por título
            </label>
            <input
              id="filtro-titulo"
              type="text"
              value={filtroTitulo}
              onChange={(e) => {
                setFiltroTitulo(e.target.value);
                setFiltroGenero('');
              }}
              placeholder="Escribe el nombre del libro..."
              className="input-field"
            />
          </div>

          <div className="filtro-group">
            <label htmlFor="filtro-genero">
              <FontAwesomeIcon icon={faFolder} className="label-icon" />
              Filtrar por género
            </label>
            <select
              id="filtro-genero"
              value={filtroGenero}
              onChange={(e) => {
                setFiltroGenero(e.target.value);
                setFiltroTitulo('');
              }}
              className="select-field"
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
            className={`reset-btn ${!filtroTitulo && !filtroGenero && !error ? 'disabled' : ''}`}
            onClick={handleResetFiltros}
            disabled={!filtroTitulo && !filtroGenero && !error}
          >
            <FontAwesomeIcon icon={faSyncAlt} className="btn-icon" />
            Limpiar
          </button>
        </div>
      </div>

      {error && (
        <div className="error-container">
          <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
          <div className="error-message">{error}</div>
        </div>
      )}

      {successMessage && (
        <div className="success-container">
          <FontAwesomeIcon icon={faCheck} className="success-icon" />
          <div className="success-message">{successMessage}</div>
        </div>
      )}

      <div className="results-section">
        {librosDisponibles.length > 0 ? (
          <>
            <div className="results-header">
              <h3 className="results-count">
                {librosDisponibles.length} {librosDisponibles.length === 1 ? 'libro disponible' : 'libros disponibles'}
              </h3>
            </div>
            
            <div className="libros-grid">
              {librosDisponibles.map((libro) => (
                <div key={libro.idLibro} className="libro-card-container">
                  <LibroCard libro={libro} />
                  <button
                    className="reservar-btn"
                    onClick={() => handleReservarLibro(libro.idLibro)}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin /> Reservando...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCalendarAlt} /> Reservar Libro
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-results">
            <FontAwesomeIcon icon={faBook} className="no-results-icon" />
            <h3>No hay libros disponibles</h3>
            <p>Actualmente no hay libros disponibles para reservar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservaCatalogo;