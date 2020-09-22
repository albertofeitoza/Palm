-- Tabela Usuario

CREATE TABLE usuario (
    id int IDENTITY(1,1) PRIMARY KEY,
    dtCriacao DATETIME,
    login varchar(255) NOT NULL,
    senha varchar(255),
	cracha varchar(255),
    bolBloqueado BIT,
    bolSistema BIT,
    bolResetaSenha BIT,
    idUsuarioCriacao int,
    idGrupoUsuario int,
    idEmpresa int,
    dataTrocaSenha DATETIME
   
);

ALTER TABLE usuario
ADD FOREIGN KEY (idGrupoUsuario) REFERENCES GrupoUsuario (id);

--------------------------------------------
-- Grupo de usuário

CREATE TABLE GrupoUsuario (
    id int IDENTITY(1,1) PRIMARY KEY,
    dtCriacao DATETIME,
    nome varchar(255) NOT NULL,
    bolBloqueado BIT,
    idUsuarioCriacao int
   
);

