import "./App.css";
import ListLivros from "./components/ListLivros";
import Detalhes from "./components/Detalhes";
import EditarLivro from "./components/EditarLivro";
import AdicionarLivro from "./components/AdicionarLivro"; // Importe o componente AdicionarLivro
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListLivros />} /> {/* Página inicial (ListLivros) */}
        <Route path="/detalhes/:id" element={<Detalhes />} /> {/* Rota para a página de detalhes */}
        <Route path="/editarLivro/:id" element={<EditarLivro />} /> {/* Rota para a página de edição */}
        <Route path="/adicionarLivro" element={<AdicionarLivro />} /> {/* Rota para a página de adição */}
      </Routes>
    </>
  );
};

export default App;
