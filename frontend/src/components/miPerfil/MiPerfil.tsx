import { faEdit, faEnvelope, faMapMarkerAlt, faPhone, faSave, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './Miperfil.css';

interface Cliente {
  usuario: string;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  fechaRegistro?: string;
}

interface MiPerfilProps {
  cliente: Cliente;
}

const MiPerfil: React.FC<MiPerfilProps> = ({ cliente }) => {
  const [editando, setEditando] = useState(false);
  const [datos, setDatos] = useState(cliente);
  const [foto, setFoto] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const guardarCambios = () => {
    console.log("Guardando cambios:", datos);
    setEditando(false);
  };

  const cancelarEdicion = () => {
    setDatos(cliente);
    setEditando(false);
  };

  return (
    <div className="mi-perfil-container">
      <div className="perfil-header">
        <h2>Mi Perfil</h2>
        {!editando ? (
          <button 
            className="editar-btn"
            onClick={() => setEditando(true)}
          >
            <FontAwesomeIcon icon={faEdit} /> Editar
          </button>
        ) : (
          <div className="acciones-btns">
            <button className="guardar-btn" onClick={guardarCambios}>
              <FontAwesomeIcon icon={faSave} /> Guardar
            </button>
            <button className="cancelar-btn" onClick={cancelarEdicion}>
              <FontAwesomeIcon icon={faTimes} /> Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="perfil-content">
        <div className="foto-perfil">
          <div className="foto-container">
            {foto ? (
              <img src={foto} alt="Foto de perfil" className="foto-usuario" />
            ) : (
              <div className="foto-placeholder">
                <FontAwesomeIcon icon={faUser} size="3x" />
              </div>
            )}
          </div>
          {editando && (
            <div className="cambiar-foto">
              <label htmlFor="foto-input" className="foto-label">
                Cambiar foto
              </label>
              <input
                id="foto-input"
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="foto-input"
              />
            </div>
          )}
        </div>

        <div className="info-perfil">
          <div className="campo-perfil">
            <label>
              <FontAwesomeIcon icon={faUser} className="icono-campo" />
              Nombre de usuario:
            </label>
            {editando ? (
              <input
                type="text"
                name="usuario"
                value={datos.usuario}
                onChange={handleChange}
                className="input-editable"
              />
            ) : (
              <span>{datos.usuario}</span>
            )}
          </div>

          <div className="campo-perfil">
            <label>
              <FontAwesomeIcon icon={faUser} className="icono-campo" />
              Nombre completo:
            </label>
            {editando ? (
              <input
                type="text"
                name="nombre"
                value={datos.nombre}
                onChange={handleChange}
                className="input-editable"
              />
            ) : (
              <span>{datos.nombre}</span>
            )}
          </div>

          <div className="campo-perfil">
            <label>
              <FontAwesomeIcon icon={faEnvelope} className="icono-campo" />
              Email:
            </label>
            {editando ? (
              <input
                type="email"
                name="email"
                value={datos.email}
                onChange={handleChange}
                className="input-editable"
              />
            ) : (
              <span>{datos.email}</span>
            )}
          </div>

          <div className="campo-perfil">
            <label>
              <FontAwesomeIcon icon={faPhone} className="icono-campo" />
              Teléfono:
            </label>
            {editando ? (
              <input
                type="tel"
                name="telefono"
                value={datos.telefono || ''}
                onChange={handleChange}
                className="input-editable"
                placeholder="Agregar teléfono"
              />
            ) : (
              <span>{datos.telefono || 'No especificado'}</span>
            )}
          </div>

          <div className="campo-perfil">
            <label>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icono-campo" />
              Dirección:
            </label>
            {editando ? (
              <input
                type="text"
                name="direccion"
                value={datos.direccion || ''}
                onChange={handleChange}
                className="input-editable"
                placeholder="Agregar dirección"
              />
            ) : (
              <span>{datos.direccion || 'No especificada'}</span>
            )}
          </div>

          {datos.fechaRegistro && (
            <div className="campo-perfil">
              <label>Miembro desde:</label>
              <span>{new Date(datos.fechaRegistro).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;