import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditarLivro() {
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
  }, [id]);

  return (
    <div>
      <h1>Editar Livro</h1>
      {livroDetalhes ? (
        <div>
          <h2>Título: {livroDetalhes.title}</h2>
          {/* Adicione um formulário para editar as informações do livro aqui */}
        </div>
      ) : (
        <p>Carregando detalhes do livro...</p>
      )}
    </div>
  );
}

export default EditarLivro;
