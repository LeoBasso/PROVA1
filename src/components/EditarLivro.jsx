import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function EditarLivro() {
  const { id } = useParams();
  const [livroDetalhes, setLivroDetalhes] = useState(null);
  const [edicao, setEdicao] = useState({
    title: "",
    publishDate: "",
    description: "",
    pageCount: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState({});

  const clearMessage = () => {
    setMensagem("");
  };

  const clearErrors = () => {
    setErros({});
  };

  useEffect(() => {
    async function buscarDetalhesDoLivro() {
      try {
        const response = await axios.get(
          `https://fakerestapi.azurewebsites.net/api/v1/books/${id}`
        );
        const detalhes = response.data;
        setLivroDetalhes(detalhes);
        setEdicao(detalhes);
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
    const errors = {};
    if (!edicao.title) {
      errors.title = "O título é obrigatório";
    }
    if (!edicao.publishDate) {
      errors.publishDate = "A data de publicação é obrigatória";
    }
    if (!edicao.description) {
      errors.description = "A descrição é obrigatória";
    }
    if (!edicao.pageCount) {
      errors.pageCount = "O número de páginas é obrigatório";
    }

    if (Object.keys(errors).length === 0) {
      try {
        await axios.put(
          `https://fakerestapi.azurewebsites.net/api/v1/books/${id}`,
          edicao
        );
        setMensagem("Alterações salvas com sucesso");
        setTimeout(clearMessage, 3000);
      } catch (error) {
        console.error("Erro ao editar o livro:", error);
        setMensagem("Erro ao editar o livro. Tente novamente");
        setTimeout(clearMessage, 3000);
      }
    } else {
      setErros(errors);
      setTimeout(clearErrors, 3000);
    }
  };

  return (
    <div className="bg-light p-4">
      <h1 className="text-darkgrey">Editar Livro</h1>
      {livroDetalhes ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={edicao.title}
              onChange={handleChange}
            />
            {erros.title && (
              <div className="text-danger">{erros.title}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Publicação</label>
            <input
              type="text"
              className="form-control"
              name="publishDate"
              value={edicao.publishDate}
              onChange={handleChange}
            />
            {erros.publishDate && (
              <div className="text-danger">{erros.publishDate}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Descrição</label>
            <textarea
              name="description"
              className="form-control"
              value={edicao.description}
              onChange={handleChange}
            />
            {erros.description && (
              <div className="text-danger">{erros.description}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Páginas</label>
            <input
              type="text"
              className="form-control"
              name="pageCount"
              value={edicao.pageCount}
              onChange={handleChange}
            />
            {erros.pageCount && (
              <div className="text-danger">{erros.pageCount}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar Alterações
          </button>
          <Link to="/" className="btn btn-secondary ms-2">
            Cancelar
          </Link>
          {mensagem && (
            <div className="alert alert-success mt-2" role="alert">
              {mensagem}
            </div>
          )}
        </form>
      ) : (
        <p>Carregando detalhes do livro...</p>
      )}
    </div>
  );
}

export default EditarLivro;
