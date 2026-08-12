create database clinica_veterinaria;
use clinica_veterinaria;

-- tabela de clientes
create table clientes (
    id_cliente int auto_increment primary key,
    nome varchar(100) not null,
    cpf varchar(14) unique,
    telefone varchar(20),
    email varchar(100),
    endereco varchar(200)
);

-- tabela de animais
create table animais (
    id_animal int auto_increment primary key,
    nome varchar(100) not null,
    especie varchar(50) not null,
    raca varchar(50),
    sexo enum('m','f'),
    idade int,
    peso decimal(5,2),
    id_cliente int not null,

    constraint fk_animal_cliente
    foreign key (id_cliente)
    references clientes(id_cliente)
    on delete cascade
);

-- tabela de veterinarios
create table veterinarios (
    id_veterinario int auto_increment primary key,
    nome varchar(100) not null,
    crmv varchar(20) unique not null,
    especialidade varchar(100),
    telefone varchar(20),
    email varchar(100)
);

-- tabela de consultas
create table consultas (
    id_consulta int auto_increment primary key,
    data_consulta date not null,
    hora time not null,
    motivo varchar(200),
    diagnostico text,
    tratamento text,
    valor decimal(10,2),

    id_animal int not null,
    id_veterinario int not null,

    constraint fk_consulta_animal
    foreign key (id_animal)
    references animais(id_animal)
    on delete cascade,

    constraint fk_consulta_veterinario
    foreign key (id_veterinario)
    references veterinarios(id_veterinario)
    on delete cascade
);

insert into clientes
(nome, cpf, telefone, email, endereco)
values
('joão silva', '123.456.789-00', '(47)99999-1111', 'joao@email.com', 'rua a'),
('maria souza', '987.654.321-00', '(47)98888-2222', 'maria@email.com', 'rua b');

insert into animais
(nome, especie, raca, sexo, idade, peso, id_cliente)
values
('rex', 'cachorro', 'labrador', 'm', 5, 28.50, 1),
('mimi', 'gato', 'persa', 'f', 3, 4.20, 2);

insert into veterinarios
(nome, crmv, especialidade, telefone, email)
values
('carlos mendes', 'sc-12345', 'clínico geral', '(47)99999-3333', 'carlos@vet.com'),
('ana lima', 'sc-54321', 'cirurgiã', '(47)99999-4444', 'ana@vet.com');

insert into consultas
(data_consulta, hora, motivo, diagnostico, tratamento, valor, id_animal, id_veterinario)
values
('2026-08-05', '09:00:00', 'vacinação', 'animal saudável', 'vacina v10', 120.00, 1, 1),
('2026-08-06', '14:30:00', 'febre', 'infecção leve', 'antibiótico', 180.00, 2, 2);

select*from clientes;
select*from animais;
select*from veterinarios;
select*from consultas;