import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Importe o Link

function AdicionarLivro() {
  const [livro, setLivro] = useState({
    title: "",
    author: "",
    description: "",
    pageCount: "",
    publishDate: "",
    // Adicione outras propriedades do livro aqui
  });

  const [mensagem, setMensagem] = useState(""); // Variável de estado para a mensagem

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro({
      ...livro,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar os dados do livro para o servidor usando axios.post
      await axios.post("https://fakerestapi.azurewebsites.net/api/v1/books", livro);

      // Exibir a mensagem de sucesso
      setMensagem("Livro adicionado com sucesso");

      // Limpar a mensagem após 3 segundos (3000 milissegundos)
      setTimeout(() => {
        setMensagem("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao adicionar o livro:", error);
      setMensagem("Erro ao adicionar o livro. Por favor, tente novamente.");
    }
  };

  return (
    <div>
      <h1>Adicionar Novo Livro</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={livro.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Autor:</label>
          <input
            type="text"
            name="author"
            value={livro.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            name="description"
            value={livro.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nº de Páginas:</label>
          <input
            type="number"
            name="pageCount"
            value={livro.pageCount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Data de publicação:</label>
          <input
            type="date"
            name="publishDate"
            value={livro.publishDate}
            onChange={handleChange}
          />
        </div>
        {/* Adicione outros campos do livro conforme necessário */}
        <button type="submit">Salvar Livro</button>
        <Link to="/"> {/* Link para a página inicial */}
          <button>Cancelar</button>
        </Link>
      </form>
    </div>
  );
}

export default AdicionarLivro;
