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
  telefone VARCHAR(20)
);

CREATE TABLE livros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  genero VARCHAR(50) NOT NULL,
  ano_publicacao INT,
  quantidade_estoque INT NOT NULL DEFAULT 0 CHECK (quantidade_estoque >= 0),
  autor_id INT NOT NULL,
  FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE RESTRICT
);

CREATE TABLE emprestimos (
  id SERIAL PRIMARY KEY,
  cliente_id INT NOT NULL,
  livro_id INT NOT NULL,
  data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
  data_devolucao DATE,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT,
  FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE RESTRICT
);

CREATE INDEX idx_livros_autor ON livros(autor_id);
CREATE INDEX idx_emp_cliente ON emprestimos(cliente_id);
CREATE INDEX idx_emp_livro ON emprestimos(livro_id);