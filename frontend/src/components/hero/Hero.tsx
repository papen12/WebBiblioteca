import React, { useEffect, useState } from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  const [visibleMain, setVisibleMain] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setVisibleMain(true), 200);
    const timer2 = setTimeout(() => setVisibleFeatures(true), 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-bg" />
      <div className="hero-container">
        <div className="hero-content">
          <div className={`hero-main ${visibleMain ? "visible" : ""}`}>
            <div className="hero-tagline">
              <span className="tagline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="activity-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19V6h13M9 6 5 3v16a1 1 0 0 0 1 1h2"
                  />
                </svg>
                BiblioVerso
              </span>
            </div>
            <h1 className="hero-title">
              El <span className="hero-title-highlight">lugar perfecto</span> para
              tus <br />
              <strong>lecturas favoritas</strong>
            </h1>
            <p className="hero-description">
              Descubre libros increíbles y sumérgete en mundos fascinantes con
              nuestra amplia colección y características exclusivas.
            </p>
          </div>

          <div className={`hero-features ${visibleFeatures ? "visible" : ""}`}>
            <div className="features-container">
              <div className="features-cards">
                <div className="feature-card">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="feature-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  </svg>
                  <h3 className="feature-title">Lectura Digital</h3>
                  <p className="feature-text">
                    Accede a tus libros en cualquier momento y lugar con nuestra
                    plataforma digital.
                  </p>
                </div>
                <div className="feature-card">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="feature-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="feature-title">Recomendaciones</h3>
                  <p className="feature-text">
                    Recibe sugerencias personalizadas basadas en tus gustos y
                    hábitos de lectura.
                  </p>
                </div>
                <div className="feature-card">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="feature-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v6h8" />
                  </svg>
                  <h3 className="feature-title">Biblioteca Comunitaria</h3>
                  <p className="feature-text">
                    Comparte y descubre libros con otros lectores en nuestra
                    comunidad.
                  </p>
                </div>
                <div className="feature-card">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="feature-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <h3 className="feature-title">Acceso Seguro</h3>
                  <p className="feature-text">
                    Mantén tus datos y libros protegidos con nuestra plataforma segura y confiable.
                  </p>
                </div>
              </div>

              <div className="gradient-bg">
                <h3 className="feature-title-2">Más que una biblioteca</h3>
                <p className="feature-text-2">
                  Vive la experiencia de una biblioteca moderna con acceso a
                  eventos, clubs de lectura y mucho más.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-decor" />
    </section>
  );
};

export default Hero;