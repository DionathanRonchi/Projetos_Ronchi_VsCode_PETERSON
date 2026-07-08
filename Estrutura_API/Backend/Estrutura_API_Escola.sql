create database escola;
use escola;

create table cursos(
    id int primary key auto_increment,
    nome varchar(100) not null
);

insert into cursos(nome) values
('Node JS'),
('JavaScript'),
('React Native'),
('Java'),
('Python'),
('C#'),
('PHP');

select * from cursos;