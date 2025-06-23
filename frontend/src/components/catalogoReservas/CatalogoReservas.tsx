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
  faBookBookmark,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CatalogoReservas.css';

interface ReservaCatalogoProps {
  ciCliente: string;
}

const ReservaCatalogo: FC<ReservaCatalogoProps> = ({ ciCliente }) => {
  const [todosLosLibros, setTodosLosLibros] = useState<Libro[]>([]);
  const [librosDisponibles, setLibrosDisponibles] = useState<Libro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filtroTitulo, setFiltroTitulo] = useState<string>('');
  const [filtroGenero, setFiltroGenero] = useState<string>('');
  const [generosDisponibles, setGenerosDisponibles] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedLibroId, setSelectedLibroId] = useState<number | null>(null);
  const [fechaLimite, setFechaLimite] = useState<Date | null>(null);

  useEffect(() => {
    const cargarLibrosDisponibles = async () => {
      try {
        setLoading(true);
        const libros = await ReservaService.getLibrosDisponibles();
        setTodosLosLibros(libros);
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
    const timer = setTimeout(() => {
      try {
        let librosFiltrados = [...todosLosLibros];

        if (filtroTitulo) {
          librosFiltrados = librosFiltrados.filter(libro =>
            libro.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
          );
        }

        if (filtroGenero) {
          librosFiltrados = librosFiltrados.filter(libro => libro.genero === filtroGenero);
        }

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
  }, [filtroTitulo, filtroGenero, todosLosLibros]);

  const handleReservarLibro = async (idLibro: number, fechaInicio: Date, fechaLimite: Date) => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const resultado = await ReservaService.crearReservaDirecta(
        idLibro,
        ciCliente,
        fechaInicio,
        fechaLimite
      );

      if (resultado.success) {
        setSuccessMessage(`Reserva #${resultado.data.idReserva} creada exitosamente`);
        const librosActualizados = await ReservaService.getLibrosDisponibles();
        setTodosLosLibros(librosActualizados);
        setLibrosDisponibles(librosActualizados);
        const generos = [...new Set(librosActualizados.map(libro => libro.genero))];
        setGenerosDisponibles(generos);
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
    setLibrosDisponibles(todosLosLibros);
    setError(null);
  };

  const ModalReserva = () => {
    if (!showModal) return null;

    const fechaActual = new Date();
    const minFechaLimite = new Date();
    minFechaLimite.setDate(fechaActual.getDate() + 1);

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Confirmar Reserva</h3>
            <button onClick={() => {
              setShowModal(false);
              setFechaLimite(null);
            }} className="close-btn">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="fecha-input-group">
            <label>Fecha de reserva:</label>
            <DatePicker
              selected={fechaActual}
              onChange={() => {}}
              disabled
              className="input-field date-picker-input"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          
          <div className="fecha-input-group">
            <label>Fecha límite de devolución:</label>
            <DatePicker
              selected={fechaLimite}
              onChange={(date: Date) => setFechaLimite(date)}
              minDate={minFechaLimite}
              className="input-field date-picker-input"
              placeholderText="Selecciona una fecha"
              dateFormat="dd/MM/yyyy"
              required
            />
          </div>
          
          <div className="modal-actions">
            <button
              onClick={() => {
                setShowModal(false);
                setFechaLimite(null);
              }}
              className="cancel-btn"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                if (!fechaLimite || !selectedLibroId) return;
                await handleReservarLibro(
                  selectedLibroId,
                  fechaActual,
                  fechaLimite
                );
                setShowModal(false);
                setFechaLimite(null);
              }}
              className="confirm-btn"
              disabled={!fechaLimite}
            >
              Confirmar Reserva
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading && !showModal) {
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
                    onClick={() => {
                      setSelectedLibroId(libro.idLibro);
                      setShowModal(true);
                    }}
                    disabled={loading}
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} /> Reservar Libro
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

      <ModalReserva />
    </div>
  );
};

export default ReservaCatalogo;