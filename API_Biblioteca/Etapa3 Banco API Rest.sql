create database biblioteca;
use biblioteca;

create table Categoria (
    Id_categoria int auto_increment primary key,
    Nome varchar(50) not null unique
);

create table Livro (
    Id_livro int auto_increment primary key,
    Titulo varchar(150) not null,
    Autor varchar(100) not null,
    Isbn varchar(17) not null unique,
    Ano_publicacao int,
    Quantidade int not null default 0,
    Id_categoria int not null,
    constraint Fk_livro_categoria foreign key (Id_categoria) 
        references Categoria(Id_categoria) 
        on delete restrict on update cascade,
    constraint Chk_livro_quantidade check (Quantidade >= 0)
);
select*from Livro;

create table Usuario (
    Id_usuario int auto_increment primary key,
    Nome varchar(100) not null,
    Cpf varchar(14) not null unique,
    Email varchar(100) not null unique,
    Telefone varchar(20)
);
select*from Usuario;

create table Emprestimo (
    Id_emprestimo int auto_increment primary key,
    Id_livro int not null,
    Id_usuario int not null,
    Data_emprestimo date not null,
    Data_prevista_devolucao date not null,
    Data_devolucao date null,
    Status varchar(20) not null default 'Ativo',
    constraint Fk_emprestimo_livro foreign key (Id_livro) 
        references Livro(Id_livro) 
        on delete restrict on update cascade,
    constraint Fk_emprestimo_usuario foreign key (Id_usuario) 
        references Usuario(Id_usuario) 
        on delete restrict on update cascade,
    constraint Chk_emprestimo_status check (Status in ('Ativo', 'Devolvido', 'Atrasado'))
);
select*from Emprestimo;

insert into Categoria (Nome) values 
('Ficção Científica'),
('Romance'),
('Tecnologia'),
('História');

insert into Livro (Titulo, Autor, Isbn, Ano_publicacao, Quantidade, Id_categoria) values 
('Duna', 'Frank Herbert', '978-8576571018', 1965, 5, 1),
('Clean Code', 'Robert C. Martin', '978-8576082675', 2008, 3, 3),
('Dom Casmurro', 'Machado de Assis', '978-8535902778', 1899, 2, 2);

insert into Usuario (Nome, Cpf, Email, Telefone) values 
('João Silva', '111.222.333-44', 'joao.silva@email.com', '(47) 99999-1111'),
('Maria Santos', '555.666.777-88', 'maria.santos@email.com', '(47) 98888-2222');

insert into Emprestimo (Id_livro, Id_usuario, Data_emprestimo, Data_prevista_devolucao, Data_devolucao, Status) values 
(1, 1, '2026-09-01', '2026-09-15', '2026-09-14', 'Devolvido'),
(2, 2, '2026-09-10', '2026-09-24', null, 'Ativo');