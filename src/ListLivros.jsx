import { useEffect, useState } from "react";
import axios from "axios";

function ListLivros() {
  const [livros, setLivros] = useState([]);
  const [expandedLivroIndex, setExpandedLivroIndex] = useState(-1);

  useEffect(() => {
    // Função para buscar os livros da API
    async function buscarLivros() {
      try {
        const response = await axios.get(
          "https://fakerestapi.azurewebsites.net/api/v1/books"
        );
        const livrosData = response.data; // Suponha que a API retorna um array de livros
        setLivros(livrosData); // Atualiza o estado com os dados dos livros
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    }

    // Chama a função para buscar os livros quando o componente for montado
    buscarLivros();
  }, []); // A lista vazia como segundo argumento faz com que o useEffect seja executado apenas uma vez

  // Função para expandir/contrair um livro
  const toggleExpand = (index) => {
    if (index === expandedLivroIndex) {
      // Se o livro já estiver expandido, feche-o
      setExpandedLivroIndex(-1);
    } else {
      setExpandedLivroIndex(index);
    }
  };

  return (
    <div>
      <h1>Lista de Livros</h1>
      <ul>
        {livros.map((livro, index) => (
          <li key={index}>
            <h2>Título: {livro.title}</h2>
            <button onClick={() => toggleExpand(index)}>
              {expandedLivroIndex === index ? "Fechar" : "Mostrar Mais"}
            </button>
            {expandedLivroIndex === index && (
              <div>
                <p>Descrição: {livro.description}</p>
                <p>Publicado: {livro.publishDate}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListLivros;
