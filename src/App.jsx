import "./App.css";
import ListLivros from "./components/ListLivros";
import EditarLivro from './components/EditarLivro';

const App = () => {
  return (
    <>
      <ListLivros />

      <Routes>
        <Route path="EditarLivro" element={<EditarLivro />} />
      </Routes>

    </>
  );
};
export default App;