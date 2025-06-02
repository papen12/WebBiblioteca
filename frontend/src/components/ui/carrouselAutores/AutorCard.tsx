import styles from "./AutorCard.module.css";
import type { Autor} from "../../../../../backend/Models/Autor";

import React from 'react';

interface AutorCardProps{
    autor:Autor
}

export const AutorCard: React.FC<AutorCardProps> = ({ autor }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.nombre}>{autor.nombre}</h3>
      <p className={styles.nacionalidad}>País: {autor.nacionalidad}</p>
      <p className={styles.fechas}>
        {autor.fechaNac} - {autor.fechaMuerte || "Presente"}
      </p>
      <p className={styles.biografia}>{autor.biografia}</p>
    </div>
  );
};
