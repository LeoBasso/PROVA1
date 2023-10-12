import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ListLivros() {
  const [livros, setLivros] = useState([]);
  

  useEffect(() => {
    // Função para buscar os livros da API
    async function buscarLivros() {
      try {
        const response = await axios.get(
          "https://fakerestapi.azurewebsites.net/api/v1/books"
        );
        const livrosData = response.data;
        setLivros(livrosData); // Atualiza o estado com os dados dos livros
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    }

    // Chama a função para buscar os livros quando o componente for montado
    buscarLivros();
  }, []);

  // Função para excluir um livro por ID
  const excluirLivro = async (livroId) => {
    try {
      await axios.delete(
        `https://fakerestapi.azurewebsites.net/api/v1/books/${livroId}`
      );
      // Atualize a lista de livros após a exclusão bem-sucedida
      setLivros(livros.filter((livro) => livro.id !== livroId));
    } catch (error) {
      console.error("Erro ao excluir o livro:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Livros</h1>
      <Link to="/adicionarLivro">
        <button>Adicionar Novo Livro</button>
      </Link>
      <ul>
        {livros.map((livro, index) => (
          <li key={index}>
            <h2>Título: {livro.title}</h2>
            <Link to={`/detalhes/${livro.id}`}>
              <button>Mostrar mais</button>
            </Link>
            <Link to={`/editarLivro/${livro.id}`}>
              <button>Editar Livro</button>
            </Link>
            <button onClick={() => excluirLivro(livro.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListLivros;
