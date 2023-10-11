import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Detalhes() {
  const { id } = useParams(); // Obtém o ID do livro da URL
  const [livroDetalhes, setLivroDetalhes] = useState(null);

  useEffect(() => {
    // Função para buscar os detalhes do livro com base no ID
    async function buscarDetalhesDoLivro() {
      try {
        const response = await axios.get(
          `https://fakerestapi.azurewebsites.net/api/v1/books/${id}`
        );
        const detalhes = response.data;
        setLivroDetalhes(detalhes);
      } catch (error) {
        console.error("Erro ao buscar detalhes do livro:", error);
      }
    }

    buscarDetalhesDoLivro();
  }, [id]); // Certifique-se de que a busca seja acionada sempre que o ID na URL mudar

  return (
    <div>
      <h1>Detalhes do Livro</h1>
      {livroDetalhes ? (
        <div>
          <h2>Título: {livroDetalhes.title}</h2>
          <p>Publicação: {livroDetalhes.publishDate}</p>
          <p>Descrição: {livroDetalhes.description}</p>
          <p>Páginas: {livroDetalhes.pageCount}</p>
          <Link to="/">Voltar para a lista de livros</Link>
        </div>
      ) : (
        <p>Carregando detalhes do livro...</p>
      )}
    </div>
  );
}

export default Detalhes;
