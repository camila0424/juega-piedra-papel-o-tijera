import "../styles/tailwind.css";
import Board from "./game/Board";
import Landing from "./landing/Landing";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  );
}

export default App;
