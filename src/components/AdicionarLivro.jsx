import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdicionarLivro() {
  const [livro, setLivro] = useState({
    title: "",
    author: "",
    description: "",
    pageCount: "",
    publishDate: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState({});

  const clearMessage = () => {
    setMensagem("");
  };

  const clearErrors = () => {
    setErros({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro({
      ...livro,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!livro.title) {
      errors.title = "O título é obrigatório";
    }
    if (!livro.author) {
      errors.author = "O autor é obrigatório";
    }
    if (!livro.description) {
      errors.description = "A descrição é obrigatória";
    }
    if (!livro.pageCount) {
      errors.pageCount = "O número de páginas é obrigatório";
    }
    if (!livro.publishDate) {
      errors.publishDate = "A data de publicação é obrigatória";
    }

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post(
          "https://fakerestapi.azurewebsites.net/api/v1/books",
          livro
        );

        setMensagem("Livro adicionado com sucesso");
        setTimeout(clearMessage, 3000);
      } catch (error) {
        console.error("Erro ao adicionar o livro:", error);
        setMensagem("Erro ao adicionar o livro. Por favor, tente novamente.");
        setTimeout(clearMessage, 3000);
      }
    } else {
      setErros(errors);
      setTimeout(clearErrors, 3000);
    }
  };

  return (
    <div className="bg-light p-4">
      <h1 className="text-darkgrey">Adicionar Novo Livro</h1>
      {mensagem && (
        <div className="alert alert-success" role="alert">
          {mensagem}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={livro.title}
            onChange={handleChange}
          />
          {erros.title && (
            <div className="text-danger">{erros.title}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Autor:</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={livro.author}
            onChange={handleChange}
          />
          {erros.author && (
            <div className="text-danger">{erros.author}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição:</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={livro.description}
            onChange={handleChange}
          />
          {erros.description && (
            <div className="text-danger">{erros.description}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Nº de Páginas:</label>
          <input
            type="number"
            className="form-control"
            name="pageCount"
            value={livro.pageCount}
            onChange={handleChange}
          />
          {erros.pageCount && (
            <div className="text-danger">{erros.pageCount}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Data de publicação:</label>
          <input
            type="date"
            className="form-control"
            name="publishDate"
            value={livro.publishDate}
            onChange={handleChange}
          />
          {erros.publishDate && (
            <div className="text-danger">{erros.publishDate}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Salvar Livro
        </button>
        <Link to="/" className="btn btn-secondary ms-2">
          Cancelar
        </Link>
      </form>
    </div>
  );
}

export default AdicionarLivro;
