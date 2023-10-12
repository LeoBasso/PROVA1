import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Detalhes() {
  const { id } = useParams();
  const [livroDetalhes, setLivroDetalhes] = useState(null);

  useEffect(() => {
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
    <div className="bg-light d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="container p-4">
        <h1 className="text-dark text-center">Detalhes do Livro</h1>
        {livroDetalhes ? (
          <div>
            <h2 className="text-center mb-3">Título: {livroDetalhes.title}</h2>
            <p className="text-center mb-2">Publicação: {livroDetalhes.publishDate}</p>
            <p className="text-center mb-2">Descrição: {livroDetalhes.description}</p>
            <p className="text-center mb-2">Páginas: {livroDetalhes.pageCount}</p>
            <div className="text-center">
              <Link to="/" className="btn btn-primary" style={{ fontSize: "1.0rem", padding: "0.3rem 0.7rem" }}>
                Voltar
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center">Carregando detalhes do livro...</p>
        )}
      </div>
    </div>
  );
}

export default Detalhes;
