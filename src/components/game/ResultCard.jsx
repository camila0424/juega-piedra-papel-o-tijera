import { useRef, useEffect } from "react";
import FinalDesktop from "../../images/final_desktop.png";
import FinalMobile from "../../images/final_mobile.png";

function ResultCard({ result, onReset, playerScore, computerScore }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Reproducción automática prevenida:", error);
        });
      }
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [result]);

  const videoSource =
    result === "player" ? "/videos/you_win.mp4" : "/videos/you_lose.mp4";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo responsivo */}
      <div
        className="hidden sm:block absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${FinalDesktop})` }}
      />
      <div
        className="sm:hidden absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${FinalMobile})` }}
      />

      {/* Contenedor principal ajustado */}
      <div className="relative z-10 w-120% max-w-4xl h-[90vh] flex flex-col items-center justify-center p-4">
        {/* Contenedor del video al 80% del viewport */}
        <div className="relative w-full h-[80vh] bg-black bg-opacity-80 rounded-xl border-2 border-yellow-500 overflow-hidden">
          <video
            ref={videoRef}
            key={videoSource}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-contain"
          >
            <source src={videoSource} type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
        </div>

        {/* Contenido inferior */}
        <div className="w-full bg-black bg-opacity-80 rounded-b-xl border-2 border-t-0 border-yellow-400 p-4 mt-[-2px]">
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-2 text-center ${
              result === "player" ? "text-green-500" : "text-red-500"
            }`}
          >
            {result === "player" ? "¡Felicidades!" : "¡Game Over!"}
          </h2>

          <p className="text-lg sm:text-xl text-white mb-4 text-center">
            {result === "player"
              ? `Ganaste ${playerScore} a ${computerScore}`
              : `Perdiste ${computerScore} a ${playerScore}`}
          </p>

          <button
            onClick={onReset}
            className="w-full max-w-xs mx-auto bg-yellow-400 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg text-lg transition-colors"
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
