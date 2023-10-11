import React, { useEffect, useState } from "react";
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
      <ul>
        {livros.map((livro, index) => (
          <li key={index}>
            <h2>Título: {livro.title}</h2>
            <button onClick={() => excluirLivro(livro.id)}>Excluir</button>
            <button>Mostrar mais</button> {/* Botão "Mostrar mais" permanece */}
            <button>Editar Livro</button> {/* Botão "Editar Livro" permanece */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListLivros;
