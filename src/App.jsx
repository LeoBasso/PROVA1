import 'bootstrap/dist/css/bootstrap.min.css';
import ListLivros from "./components/ListLivros";
import Detalhes from "./components/Detalhes";
import EditarLivro from "./components/EditarLivro";
import AdicionarLivro from "./components/AdicionarLivro";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListLivros />} />
        <Route path="/detalhes/:id" element={<Detalhes />} />
        <Route path="/editarLivro/:id" element={<EditarLivro />} />
        <Route path="/adicionarLivro" element={<AdicionarLivro />} />
      </Routes>
    </>
  );
};

export default App;
