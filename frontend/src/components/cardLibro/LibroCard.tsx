import React from 'react';
import type { Libro } from '../../../../backend/Models/Libro';
import './LibroCard.css';
import logazo from './../../assets/logazo.png'
interface LibroCardProps {
  libro: Libro;
}

const LibroCard: React.FC<LibroCardProps> = ({ libro }) => {
  return (
    <div className="libro-card">
      <div className="portada-container">
        <img 
          src={libro.portada || logazo} 
          alt="Portada no encontrada"
          className="portada-img"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/default-book-cover.jpg';
          }}
        />
      </div>
      <div className="libro-info">
        <h3 className="libro-titulo">{libro.titulo}</h3>
        <p className="libro-editorial">{libro.editorial}</p>
      </div>
    </div>
  );
};

export default LibroCard;