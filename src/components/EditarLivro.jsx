import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function EditarLivro() {
  const { id } = useParams(); // Obtém o ID do livro da URL
  const [livroDetalhes, setLivroDetalhes] = useState(null);
  const [edicao, setEdicao] = useState({
    title: "",
    publishDate: "",
    description: "",
    pageCount: "",
  });
  const [mensagem, setMensagem] = useState(""); // Variável de estado para a mensagem

  useEffect(() => {
    // Função para buscar os detalhes do livro com base no ID
    async function buscarDetalhesDoLivro() {
      try {
        const response = await axios.get(
          `https://fakerestapi.azurewebsites.net/api/v1/books/${id}`
        );
        const detalhes = response.data;
        setLivroDetalhes(detalhes);
        setEdicao(detalhes); // Preenche o formulário com os dados atuais
      } catch (error) {
        console.error("Erro ao buscar detalhes do livro:", error);
      }
    }

    buscarDetalhesDoLivro();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEdicao({ ...edicao, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `https://fakerestapi.azurewebsites.net/api/v1/books/${id}`,
        edicao
      );
      // Atualize a mensagem de sucesso
      setMensagem("Alterações salvas com sucesso");
    } catch (error) {
      console.error("Erro ao editar o livro:", error);
      setMensagem("Erro ao editar o livro. Tente novamente.");
    }
  };

  return (
    <div>
      <h1>Editar Livro</h1>
      {livroDetalhes ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Título</label>
            <input
              type="text"
              name="title"
              value={edicao.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Publicação</label>
            <input
              type="text"
              name="publishDate"
              value={edicao.publishDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Descrição</label>
            <textarea
              name="description"
              value={edicao.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Páginas</label>
            <input
              type="text"
              name="pageCount"
              value={edicao.pageCount}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Salvar Alterações</button>
          <Link to="/">
            <button>Cancelar</button>
          </Link>
          {mensagem && <p>{mensagem}</p>}
        </form>
      ) : (
        <p>Carregando detalhes do livro...</p>
      )}
    </div>
  );
}

export default EditarLivro;
