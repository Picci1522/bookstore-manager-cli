-- Remove tabelas se já existirem
DROP TABLE IF EXISTS emprestimos;
DROP TABLE IF EXISTS livros;
DROP TABLE IF EXISTS autores;
DROP TABLE IF EXISTS clientes;

-- Tabela de Autores
CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(50),
    data_nascimento DATE
);

-- Tabela de Clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT
);

-- Tabela de Livros
CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    ano_publicacao INT CHECK (ano_publicacao > 0),
    quantidade_disponivel INT NOT NULL DEFAULT 1 CHECK (quantidade_disponivel >= 0),
    autor_id INT NOT NULL,
    FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabela de Empréstimos
CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INT NOT NULL,
    cliente_id INT NOT NULL,
    data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao DATE,
    devolvido BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Índices para melhorar desempenho
CREATE INDEX idx_livros_autor ON livros(autor_id);
CREATE INDEX idx_emprestimos_livro ON emprestimos(livro_id);
CREATE INDEX idx_emprestimos_cliente ON emprestimos(cliente_id);