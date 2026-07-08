DROP TABLE IF EXISTS emprestimos;
DROP TABLE IF EXISTS livros;
DROP TABLE IF EXISTS autores;
DROP TABLE IF EXISTS clientes;

CREATE TABLE autores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  nacionalidade VARCHAR(50),
  data_nascimento DATE
);

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  endereco TEXT
);

CREATE TABLE livros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  ano_publicacao INT,
  quantidade_disponivel INT NOT NULL DEFAULT 1,
  autor_id INT NOT NULL,
  FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE RESTRICT
);

CREATE TABLE emprestimos (
  id SERIAL PRIMARY KEY,
  livro_id INT NOT NULL,
  cliente_id INT NOT NULL,
  data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
  data_devolucao DATE,
  devolvido BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE RESTRICT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT
);