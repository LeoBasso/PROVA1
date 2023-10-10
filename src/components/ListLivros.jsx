import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListLivros() {
  const [livros, setLivros] = useState([]);
  const [expandedLivroIndex, setExpandedLivroIndex] = useState(-1);
  const [novoLivro, setNovoLivro] = useState({
    title: "",
    description: "",
    publishDate: "",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para controlar a exibição do formulário de adição
  const [editandoLivroIndex, setEditandoLivroIndex] = useState(-1); // Estado para rastrear o índice do livro em edição
  const [livroEditado, setLivroEditado] = useState({
    title: "",
    description: "",
    publishDate: "",
  }); // Estado para rastrear as alterações nos dados do livro em edição

  useEffect(() => {
    // Função para buscar os livros da API
    async function buscarLivros() {
      try {
        const response = await axios.get(
          "https://fakerestapi.azurewebsites.net/api/v1/books"
        );
        const livrosData = response.data; // Suponha que a API retorna um array de livros
        setLivros(livrosData); // Atualiza o estado com os dados dos livros
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    }

    // Chama a função para buscar os livros quando o componente for montado
    buscarLivros();
  }, []); // A lista vazia como segundo argumento faz com que o useEffect seja executado apenas uma vez

  // Função para expandir/contrair um livro
  const toggleExpand = (index) => {
    if (index === expandedLivroIndex) {
      // Se o livro já estiver expandido, feche-o
      setExpandedLivroIndex(-1);
    } else {
      setExpandedLivroIndex(index);
    }
  };

  // Função para lidar com a mudança nos campos do novo livro
  const handleNovoLivroChange = (event) => {
    const { name, value } = event.target;
    setNovoLivro({
      ...novoLivro,
      [name]: value,
    });
  };

  // Função para enviar o novo livro para a API
  const enviarNovoLivro = async () => {
    try {
      await axios.post(
        "https://fakerestapi.azurewebsites.net/api/v1/books",
        novoLivro
      );
      // Após o envio bem-sucedido, você pode buscar os livros novamente para incluir o novo livro na lista
      buscarLivros();
      // Limpar os campos do novo livro
      setNovoLivro({
        title: "",
        description: "",
        publishDate: "",
      });
      // Fechar o formulário após o envio
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Erro ao enviar novo livro:", error);
    }
  };

  // Função para começar a editar um livro existente
  const iniciarEdicao = (index, livro) => {
    setEditandoLivroIndex(index);
    setLivroEditado(livro);
  };

  // Função para cancelar a edição do livro
  const cancelarEdicao = () => {
    setEditandoLivroIndex(-1);
    setLivroEditado({
      title: "",
      description: "",
      publishDate: "",
    });
  };

  // Função para salvar as alterações feitas no livro
  const salvarEdicao = async () => {
    try {
      await axios.put(
        `https://fakerestapi.azurewebsites.net/api/v1/books/${livros[editandoLivroIndex].id}`,
        livroEditado
      );
      // Após a edição bem-sucedida, você pode buscar os livros novamente para atualizar a lista
      buscarLivros();
      // Limpar os campos do livro editado e encerrar a edição
      setEditandoLivroIndex(-1);
      setLivroEditado({
        title: "",
        description: "",
        publishDate: "",
      });
    } catch (error) {
      console.error("Erro ao editar livro:", error);
    }
  };

  // Função para excluir um livro
  const excluirLivro = async (id) => {
    try {
      await axios.delete(
        `https://fakerestapi.azurewebsites.net/api/v1/books/${id}`
      );
      // Após a exclusão bem-sucedida, você pode buscar os livros novamente para atualizar a lista
      buscarLivros();
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Livros</h1>
      {mostrarFormulario ? ( // Renderizar o formulário de adição se mostrarFormulario for verdadeiro
        <div>
          <h2>Adicionar Novo Livro</h2>
          <form>
            <label>
              Título:
              <input
                type="text"
                name="title"
                value={novoLivro.title}
                onChange={handleNovoLivroChange}
              />
            </label>
            <label>
              Descrição:
              <input
                type="text"
                name="description"
                value={novoLivro.description}
                onChange={handleNovoLivroChange}
              />
            </label>
            <label>
              Publicado:
              <input
                type="text"
                name="publishDate"
                value={novoLivro.publishDate}
                onChange={handleNovoLivroChange}
              />
            </label>
            <button type="button" onClick={enviarNovoLivro}>
              Enviar Novo Livro
            </button>
          </form>
        </div>
      ) : (
        // Renderizar o botão para mostrar o formulário de adição
        <button onClick={() => setMostrarFormulario(true)}>
          Adicionar Novo Livro
        </button>
      )}
      <ul>
        {livros.map((livro, index) => (
          <li key={index}>
            <h2>Título: {livro.title}</h2>
            {editandoLivroIndex === index ? (
              // Renderizar o formulário de edição se o livro estiver em edição
              <div>
                <label>
                  Novo Título:
                  <input
                    type="text"
                    name="title"
                    value={livroEditado.title}
                    onChange={(event) =>
                      setLivroEditado({
                        ...livroEditado,
                        title: event.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Nova Descrição:
                  <input
                    type="text"
                    name="description"
                    value={livroEditado.description}
                    onChange={(event) =>
                      setLivroEditado({
                        ...livroEditado,
                        description: event.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Nova Data de Publicação:
                  <input
                    type="text"
                    name="publishDate"
                    value={livroEditado.publishDate}
                    onChange={(event) =>
                      setLivroEditado({
                        ...livroEditado,
                        publishDate: event.target.value,
                      })
                    }
                  />
                </label>
                <button type="button" onClick={salvarEdicao}>
                  Salvar
                </button>
                <button type="button" onClick={cancelarEdicao}>
                  Cancelar
                </button>
              </div>
            ) : (
              // Renderizar o botão para editar o livro se ele não estiver em edição
              <button onClick={() => iniciarEdicao(index, livro)}>Editar</button>
            )}
            <button onClick={() => toggleExpand(index)}>
              {expandedLivroIndex === index ? "Fechar" : "Mostrar Mais"}
            </button>
            <button onClick={() => excluirLivro(livro.id)}>Excluir</button> {/* Botão para excluir o livro */}
            {expandedLivroIndex === index && (
              <div>
                <p>Descrição: {livro.description}</p>
                <p>Publicado: {livro.publishDate}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListLivros;
