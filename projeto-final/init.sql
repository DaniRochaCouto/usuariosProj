USE ProjFinalUser;

CREATE TABLE users (
    id VARCHAR(355) PRIMARY KEY, 
    nomeusuario VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(30) NOT   NULL,
    senha VARCHAR(50) NOT NULL,
    nomecompleto VARCHAR(60) NOT   NULL,
    telefone VARCHAR(15) NOT   NULL,
    datacadastro VARCHAR(10) NOT NULL

);

INSERT INTO users (id, nomeusuario, email, senha, nomecompleto, telefone, datacadastro) VALUES 
('1cf641f0-19a1-4699-94f6-5cc45c061ca8', 'admin', 'admin@dani.com', 'admin', 'nome do admin', '61982365606', 
'30/07/2000'),
('9dc5bbbd-39f2-49ec-a8c2-7294b31e9385', 'adriana', 'adrianan@dani.com', 'adri', 'Adriana da Rocha', 
'61982365606', '01/07/2000'),
('aee94fdd-fa8b-46c7-a6ad-c01e0f1c567e', 'gabriel', 'gabi@dani.com', 'Gabi123', 'Gabriel da silva',
 '6191345678', '30/05/2004');
