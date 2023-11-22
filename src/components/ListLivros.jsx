import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ListLivros() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    async function buscarLivros() {
      try {
        const response = await axios.get(
          "https://fakerestapi.azurewebsites.net/api/v1/books"
        );
        const livrosData = response.data;
        setLivros(livrosData);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    }

    buscarLivros();
  }, []);

  const excluirLivro = async (livroId) => {
    const confirmarExclusao = window.confirm("Tem certeza de que deseja excluir este livro?");

    if (confirmarExclusao) {
      try {
        await axios.delete(
          `https://fakerestapi.azurewebsites.net/api/v1/books/${livroId}`
        );
        setLivros(livros.filter((livro) => livro.id !== livroId));
      } catch (error) {
        console.error("Erro ao excluir o livro:", error);
      }
    }
  };

  return (
    <div className="bg-light p-4 position-relative">
      <h1 className="text-darkgrey">Lista de Livros</h1>
      <Link to="/adicionarLivro">
        <button className="btn btn-primary position-absolute top-0 end-0 mt-4 me-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
          </svg> Adicionar Novo Livro
        </button>
      </Link>
      <div className="row">
        {livros.map((livro, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">{livro.title}</h2>
                <Link to={`/detalhes/${livro.id}`}>
                  <button className="btn btn-success mx-2" style={{ opacity: 0.7 }}>Mostrar mais</button>
                </Link>
                <Link to={`/editarLivro/${livro.id}`}>
                  <button className="btn btn-primary mx-2" style={{ opacity: 0.6 }}>Editar Livro</button>
                </Link>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => excluirLivro(livro.id)}
                  style={{ opacity: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg> Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListLivros;
