create database agencia_viagens;
use agencia_viagens;

create table destinos(
ID int primary key auto_increment,
Nome varchar(100) not null,
País varchar(60)
);

insert into destinos(ID, Nome, País) values
(140, 'Claudia', 'Alemanha'),
(230, 'Douglas', 'Noruega'),
(320, 'Rodrigo', 'Cabo Verde'),
(410, 'Rafael', 'Senegal');


select * from destinos;

