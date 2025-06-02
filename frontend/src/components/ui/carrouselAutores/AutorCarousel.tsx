import React, { useEffect, useState } from "react";
import { AutorService } from "../../../services/AutorService";
import type { Autor } from "../../../../../backend/Models/Autor";
import { AutorCard } from "./AutorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./AutorCarousel.module.css";

const MemoizedAutorCard = React.memo(AutorCard);

export const AutorCarousel: React.FC = () => {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const data = await AutorService.getAll();
        setAutores(data);
      } catch (err) {
        setError("Error al cargar autores");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAutores();
  }, []);

  if (loading) return <div className={styles.loading}>Cargando autores...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (autores.length === 0) return <div className={styles.empty}>No hay autores disponibles.</div>;

  return (
    <div className={styles.carouselContainer}>
      <Swiper
  modules={[Navigation, Pagination]}
  spaceBetween={20}      
  slidesPerView={3}    
  navigation             
  pagination={{ clickable: true }} 
  loop={true}           
  
  breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }}
 
  speed={500}          
  grabCursor={false}     
  a11y={{
    prevSlideMessage: 'Autor anterior',
    nextSlideMessage: 'Siguiente autor'
  }}
>
  {autores.map((autor) => (
    <SwiperSlide key={autor.idAutor}>
      <MemoizedAutorCard autor={autor} />
    </SwiperSlide>
  ))}
</Swiper>
    </div>
  );
};