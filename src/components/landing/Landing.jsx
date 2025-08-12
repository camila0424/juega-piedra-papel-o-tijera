import Desktop from "../../images/desktop.png";
import Mobile from "../../images/mobile.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Landing() {
  const navigate = useNavigate();
  const [isTransporting, setIsTransporting] = useState(false);

  // Maneja click con animación y después navegación
  const handleStartGame = () => {
    setIsTransporting(true);

    // Después de duración de animación (ejemplo 1s), navega a /board
    setTimeout(() => {
      navigate("/board");
    }, 1000); // 1000ms = duración animación
  };

  return (
    <section
      className={`relative w-full h-screen bg-cover bg-center flex items-center justify-end sm:justify-end
        ${isTransporting ? "animate-absorb" : ""}
      `}
      style={{
        backgroundImage: `url(${Desktop})`,
      }}
    >
      {/* Imagen mobile para pantallas pequeñas */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:hidden"
        style={{
          backgroundImage: `url(${Mobile})`,
        }}
      ></div>

      {/* Recuadro con contenido */}
      <div
        className={`
          relative z-10 max-w-md text-white p-6 rounded-xl
          sm:bg-black/60 bg-black/80
          sm:mr-15 mx-auto mt-6 sm:-mt-0
          sm:translate-y-0 translate-y-0
          animate-fadeIn
          ${isTransporting ? "pointer-events-none" : ""}
        `}
      >
        <h2 className="text-2xl font-semibold mb-2 animate-slideDown">
          Es hora de jugar
        </h2>
        <h1 className="text-4xl sm:text-4xl font-bold mb-2 animate-slideUp">
          Piedra, Papel o Tijera.
        </h1>
        <h2 className="text-2xl mb-4 animate-fadeInDelay">
          ¿Estás listo para ganar?
        </h2>
        <button
          onClick={handleStartGame}
          className="inline-block bg-yellow-600 hover:bg-yellow-700 text-black font-semibold text-lg py-2 px-4 rounded-lg transition-all duration-300 animate-bounceOnce cursor-pointer"
          disabled={isTransporting}
        >
          Comenzar juego
        </button>
      </div>
    </section>
  );
}

export default Landing;
