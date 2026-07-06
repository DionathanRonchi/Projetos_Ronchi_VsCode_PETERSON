create database agencia_viagens;
use agencia_viagens;

create table destinos(
    id_destino int primary key auto_increment,
    nome varchar(100) not null,
    pais varchar(60)
);
insert into destinos(id_destino, nome, pais) values
(1, 'Munique', 'Alemanha'),
(2, 'Oslo', 'Noruega'),
(3, 'Santa Maria', 'Cabo Verde'),
(4, 'Paris', 'França');
select * from destinos;



create table clientes(
    id_cliente int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(60),
    telefone varchar(50)
);
insert into clientes(id_cliente, nome, email, telefone) values
(1, 'Joana', 'joana01@gmail.com', '4745635842'),
(2, 'Carlos', 'carlos02@gmail.com', '4786526325'),
(3, 'Jones', 'jones03@gmail.com', '1154863248'),
(4, 'Pedro', 'pedro04@gmail.com', '2545896358');
select * from clientes;


create table reservas(
    id_reserva int primary key auto_increment,
    id_cliente int,
    id_destino int,
    data_viagem date,
    foreign key (id_cliente) references clientes(id_cliente),
    foreign key (id_destino) references destinos(id_destino)
);
insert into reservas (id_reserva, id_cliente, id_destino, data_viagem) values
(1, 1, 1, str_to_date('05/07/2026', '%d/%m/%Y')),
(2, 2, 2, str_to_date('02/05/2030', '%d/%m/%Y')),
(3, 3, 3, str_to_date('06/09/2030', '%d/%m/%Y')),
(4, 4, 4, str_to_date('10/01/2040', '%d/%m/%Y'));
select * from reservas;
