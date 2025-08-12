import { useState, useEffect } from "react";
import Rock from "../../images/objects/rock.png";
import Paper from "../../images/objects/paper.png";
import Scissors from "../../images/objects/scissors.png";
import BoardImage from "../../images/board_image.jpg";
import FinalDesktop from "../../images/final_desktop.png";
import FinalMobile from "../../images/final_mobile.png";
import ResultCard from "./ResultCard";

const options = [
  { value: "piedra", label: "Piedra", img: Rock },
  { value: "papel", label: "Papel", img: Paper },
  { value: "tijera", label: "Tijera", img: Scissors },
];

function decideWinner(player, computer) {
  if (player === computer) return "empate";

  if (
    (player === "piedra" && computer === "tijera") ||
    (player === "papel" && computer === "piedra") ||
    (player === "tijera" && computer === "papel")
  ) {
    return "player";
  } else {
    return "computer";
  }
}

function Board() {
  const [selected, setSelected] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [message, setMessage] = useState("Vamos a Jugar!");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [ties, setTies] = useState(0);
  const [computerChoice, setComputerChoice] = useState(null);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // Verificar si el juego ha terminado
  useEffect(() => {
    if (playerScore >= 5 || computerScore >= 5) {
      setGameOver(true);
    }
  }, [playerScore, computerScore]);

  const handleSelect = (option) => {
    if (gameOver) return;
    setSelected(option);
    setShowOptions(false);
    setMessage("¡Listo para jugar!");
    setWinner(null);
  };

  const handlePlay = () => {
    if (!selected || gameOver) return;

    const randomIndex = Math.floor(Math.random() * options.length);
    const computer = options[randomIndex];

    setComputerChoice(computer);

    const result = decideWinner(selected.value, computer.value);
    setWinner(result);

    if (result === "empate") {
      setMessage(`¡Empate! Ambos eligieron ${selected.label}`);
      setTies((count) => count + 1);
    } else if (result === "player") {
      setMessage(`¡Ganaste! ${selected.label} vence a ${computer.label}`);
      setPlayerScore((score) => score + 1);
    } else {
      setMessage(`Perdiste... ${computer.label} vence a ${selected.label}`);
      setComputerScore((score) => score + 1);
    }
  };

  const handleReset = () => {
    setSelected(null);
    setComputerChoice(null);
    setMessage("Vamos a Jugar!");
    setPlayerScore(0);
    setComputerScore(0);
    setTies(0);
    setWinner(null);
    setGameOver(false);
    setShowOptions(false);
  };

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white p-4 sm:p-6 md:p-8"
      style={{
        backgroundImage: gameOver
          ? `url(${FinalDesktop})`
          : `url(${BoardImage})`,
      }}
    >
      {gameOver && (
        <div
          className="absolute inset-0 bg-cover bg-center sm:hidden"
          style={{
            backgroundImage: `url(${FinalMobile})`,
          }}
        ></div>
      )}

      <div className="bg-black bg-opacity-90 p-4 sm:p-6 md:p-8 rounded-lg max-w-lg w-full flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-center">
          Piedra, Papel o Tijera
        </h1>
        <h2 className="text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-6 text-center">
          Elige tu jugada
        </h2>

        {/* Selector de jugada */}
        <div className="relative inline-block text-black mb-2 sm:mb-3 w-full max-w-xs">
          <button
            onClick={() => !gameOver && setShowOptions(!showOptions)}
            className={`flex items-center gap-2 bg-white p-2 rounded shadow w-full justify-center text-sm sm:text-base lg:text-lg ${
              gameOver ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            type="button"
            disabled={gameOver}
          >
            {selected ? (
              <>
                <img
                  src={selected.img}
                  alt={selected.label}
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                />
                <span>{selected.label}</span>
              </>
            ) : (
              <span>Seleccione su jugada</span>
            )}
            {!gameOver && (
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            )}
          </button>

          {showOptions && (
            <ul className="absolute mt-1 bg-white shadow-lg rounded w-full z-10 max-w-xs text-sm sm:text-base lg:text-lg">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className="flex items-center gap-2 p-2 hover:bg-yellow-200 cursor-pointer"
                >
                  <img
                    src={option.img}
                    alt={option.label}
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                  />
                  <span>{option.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Botón jugar */}
        <button
          disabled={!selected || gameOver}
          onClick={handlePlay}
          className={`bg-yellow-400 hover:bg-yellow-600 text-black font-semibold py-2 px-4 sm:py-2 sm:px-6 rounded transition-opacity duration-300 w-full max-w-xs text-sm  sm:text-base lg:text-lg ${
            !selected || gameOver
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          Jugar!
        </button>

        {/* Mensaje y jugada de la computadora */}
        <div className="mt-2 sm:mt-2 bg-black bg-opacity-50 p-3 sm:p-4 rounded text-center max-w-md w-full">
          <p
            className={`text-base sm:text-lg lg:text-xl ${
              winner === "player"
                ? "text-green-400"
                : winner === "computer"
                ? "text-red-500"
                : winner === "empate"
                ? "text-yellow-400"
                : "text-white"
            }`}
          >
            {message}
          </p>
          {computerChoice && (
            <p className="mt-2 flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg">
              Computadora eligió:{" "}
              <img
                src={computerChoice.img}
                alt={computerChoice.label}
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 inline-block"
              />
              <span>{computerChoice.label}</span>
            </p>
          )}
        </div>

        {/* Puntajes */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-2 sm:mt-4 text-base sm:text-lg lg:text-xl font-semibold max-w-md w-full justify-center text-center">
          <h3>Jugador: {playerScore}</h3>
          <h3>Computadora: {computerScore}</h3>
          <h3 className="text-yellow-400">Empates: {ties}</h3>
        </div>

        {/* Botón reiniciar e ir al inicio*/}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs mt-4 sm:mt-6">
          <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-2 sm:py-2 sm:px-6 rounded w-full text-sm sm:text-base lg:text-medium"
          >
            Reiniciar Juego
          </button>

          <a
            href="/"
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-semibold py-2 px-2 sm:py-2 sm:px-6 rounded w-full text-sm sm:text-base lg:text-medium text-center"
          >
            Ir al inicio
          </a>
        </div>
      </div>
      {/* Mostrar ResultCard cuando el juego termine */}
      {gameOver && (
        <ResultCard
          result={playerScore >= 5 ? "player" : "computer"}
          onReset={handleReset}
          playerScore={playerScore}
          computerScore={computerScore}
        />
      )}
    </section>
  );
}

export default Board;
