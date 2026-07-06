const express = require('express');
const connection = require('./db');
const server = express();

//Middleware que permite o servidor entender requisições com JSON no corpo (req.body)
server.use(express.json());


//Método HTTP: GET
//LISTAR TODOS OS DESTINOS
//localhost:3023/destinos
server.get('/destinos', (req, res) => {
    const sql = 'SELECT * FROM destinos';
    connection.query(sql, (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao buscar destinos' });
        }
        return res.json(resultados);
    });
});

//Método HTTP: GET
//LISTAR TODAS AS RESERVAS DE UM DESTINO (CONSULTA)
//localhost:3023/destinos/2/reservas
//OBS: precisa vir ANTES de /destinos/:id para o Express não confundir "reservas" com um ID
server.get('/destinos/:id/reservas', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT id_reserva, id_cliente, id_destino, DATE_FORMAT(data_viagem, '%d/%m/%Y') AS data_viagem FROM reservas WHERE id_destino = ?";
    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao buscar reservas do destino' });
        }
        return res.json(resultados);
    });
});

//Método HTTP: GET
//LISTAR UM UNICO DESTINO
//localhost:3023/destinos/2
server.get('/destinos/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM destinos WHERE id_destino = ?';
    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao buscar destino' });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ error: 'Destino não encontrado' });
        }
        return res.json(resultados[0]);
    });
});

//Método HTTP: GET
//LISTAR DESTINOS POR PAÍS
//localhost:3023/destinos/pais/Brasil
server.get('/destinos/pais/:pais', (req, res) => {
    const pais = req.params.pais;
    const sql = 'SELECT * FROM destinos WHERE pais = ?';
    connection.query(sql, [pais], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao buscar destinos por país' });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ error: `Nenhum destino encontrado para o país ${pais}` });
        }
        return res.json(resultados);
    });
});

//Método HTTP: POST
//CRIAR UM NOVO DESTINO
//localhost:3023/destinos
//{ "nome": "Roma", "pais": "Itália" }
server.post('/destinos', (req, res) => {

    const { nome, pais } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'O campo nome é obrigatório' });
    }

    const sql = 'INSERT INTO destinos (nome, pais) VALUES (?, ?)';

    connection.query(sql, [nome, pais], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json({
            mensagem: 'Destino cadastrado com sucesso',
            id: resultados.insertId,
            nome: nome,
            pais: pais
        });
    });
});

//Método HTTP: PUT
//ATUALIZAR UM DESTINO
//localhost:3023/destinos/1
//{ "nome": "Rio de Janeiro", "pais": "Brasil" }
server.put('/destinos/:id', (req, res) => {

    const id = req.params.id;
    const { nome, pais } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'O campo nome é obrigatório' });
    }

    const sql = 'UPDATE destinos SET nome = ?, pais = ? WHERE id_destino = ?';

    connection.query(sql, [nome, pais, id], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao atualizar destino' });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ error: 'Destino não encontrado' });
        }
        return res.json({ mensagem: 'Destino atualizado com sucesso' });
    });
});

//Método HTTP: DELETE
//DELETAR UM DESTINO
//localhost:3023/destinos/1
server.delete('/destinos/:id', (req, res) => {

    const { id } = req.params;
    const sql = 'DELETE FROM destinos WHERE id_destino = ?';

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao deletar destino' });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ error: 'Destino não encontrado' });
        }
        return res.json({ mensagem: 'Destino deletado com sucesso' });
    });
});


//Método HTTP: GET
//LISTAR CLIENTES EM ORDEM ALFABÉTICA (CONSULTA)
//localhost:3023/clientes/ordenados
//OBS: precisa vir ANTES de /clientes/:id para o Express não confundir "ordenados" com um ID
server.get('/clientes/ordenados', (req, res) => {
    const sql = 'SELECT * FROM clientes ORDER BY nome ASC';
    connection.query(sql, (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao buscar clientes ordenados' });
        }
        return res.json(resultados);
    });
});

//Método HTTP: GET
//LISTAR TODAS AS RESERVAS DE UM CLIENTE (CONSULTA)
//localhost:3023/clientes/3/reservas
//OBS: precisa vir ANTES de /clientes/:id para o Express não confundir "reservas" com um ID
server.get('/clientes/:id/reservas', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT id_reserva, id_cliente, id_destino, DATE_FORMAT(data_viagem, '%d/%m/%Y') AS data_viagem FROM reservas WHERE id_cliente = ?";
    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao buscar reservas do cliente' });
        }
        return res.json(resultados);
    });
});

//Método HTTP: GET
//LISTAR TODOS OS CLIENTES
//localhost:3023/clientes
server.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';
    connection.query(sql, (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao buscar clientes' });
        }
        return res.json(resultados);
    });
});

//Método HTTP: GET
//LISTAR UM UNICO CLIENTE
//localhost:3023/clientes/1
server.get('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM clientes WHERE id_cliente = ?';
    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao buscar cliente' });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        return res.json(resultados[0]);
    });
});

//Método HTTP: POST
//CRIAR UM NOVO CLIENTE
//localhost:3023/clientes
//{ "nome": "Maria Silva", "email": "maria@email.com", "telefone": "47999998888" }
server.post('/clientes', (req, res) => {

    const { nome, email, telefone } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'O campo nome é obrigatório' });
    }

    const sql = 'INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)';

    connection.query(sql, [nome, email, telefone], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json({
            mensagem: 'Cliente cadastrado com sucesso',
            id: resultados.insertId,
            nome: nome,
            email: email,
            telefone: telefone
        });
    });
});

//Método HTTP: PUT
//ATUALIZAR UM CLIENTE
//localhost:3023/clientes/1
//{ "nome": "Maria Silva", "email": "maria@email.com", "telefone": "47999998888" }
server.put('/clientes/:id', (req, res) => {

    const id = req.params.id;
    const { nome, email, telefone } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'O campo nome é obrigatório' });
    }

    const sql = 'UPDATE clientes SET nome = ?, email = ?, telefone = ? WHERE id_cliente = ?';

    connection.query(sql, [nome, email, telefone, id], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao atualizar cliente' });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        return res.json({ mensagem: 'Cliente atualizado com sucesso' });
    });
});

//Método HTTP: DELETE
//DELETAR UM CLIENTE
//localhost:3023/clientes/1
server.delete('/clientes/:id', (req, res) => {

    const { id } = req.params;
    const sql = 'DELETE FROM clientes WHERE id_cliente = ?';

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao deletar cliente' });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        return res.json({ mensagem: 'Cliente deletado com sucesso' });
    });
});


//Método HTTP: GET
//LISTAR TODAS AS RESERVAS
//localhost:3023/reservas
server.get('/reservas', (req, res) => {
    const sql = "SELECT id_reserva, id_cliente, id_destino, DATE_FORMAT(data_viagem, '%d/%m/%Y') AS data_viagem FROM reservas";
    connection.query(sql, (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao buscar reservas' });
        }
        return res.json(resultados);
    });
});

//Método HTTP: GET
//LISTAR UMA UNICA RESERVA
//localhost:3023/reservas/1
server.get('/reservas/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT id_reserva, id_cliente, id_destino, DATE_FORMAT(data_viagem, '%d/%m/%Y') AS data_viagem FROM reservas WHERE id_reserva = ?";
    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao buscar reserva' });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ error: 'Reserva não encontrada' });
        }
        return res.json(resultados[0]);
    });
});

//Método HTTP: POST
//CRIAR UMA NOVA RESERVA
//localhost:3023/reservas
//{ "id_cliente": 1, "id_destino": 2, "data_viagem": "15/08/2026" }
server.post('/reservas', (req, res) => {

    const { id_cliente, id_destino, data_viagem } = req.body;

    if (!id_cliente || !id_destino || !data_viagem) {
        return res.status(400).json({ error: 'Os campos id_cliente, id_destino e data_viagem são obrigatórios' });
    }

    const sql = "INSERT INTO reservas (id_cliente, id_destino, data_viagem) VALUES (?, ?, STR_TO_DATE(?, '%d/%m/%Y'))";

    connection.query(sql, [id_cliente, id_destino, data_viagem], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json({
            mensagem: 'Reserva cadastrada com sucesso',
            id: resultados.insertId,
            id_cliente: id_cliente,
            id_destino: id_destino,
            data_viagem: data_viagem
        });
    });
});

//Método HTTP: PUT
//ATUALIZAR UMA RESERVA
//localhost:3023/reservas/1
//{ "id_cliente": 1, "id_destino": 2, "data_viagem": "20/08/2026" }
server.put('/reservas/:id', (req, res) => {

    const id = req.params.id;
    const { id_cliente, id_destino, data_viagem } = req.body;

    if (!id_cliente || !id_destino || !data_viagem) {
        return res.status(400).json({ error: 'Os campos id_cliente, id_destino e data_viagem são obrigatórios' });
    }

    const sql = "UPDATE reservas SET id_cliente = ?, id_destino = ?, data_viagem = STR_TO_DATE(?, '%d/%m/%Y') WHERE id_reserva = ?";

    connection.query(sql, [id_cliente, id_destino, data_viagem, id], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao atualizar reserva' });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva não encontrada' });
        }
        return res.json({ mensagem: 'Reserva atualizada com sucesso' });
    });
});

//Método HTTP: DELETE
//DELETAR UMA RESERVA
//localhost:3023/reservas/1
server.delete('/reservas/:id', (req, res) => {

    const { id } = req.params;
    const sql = 'DELETE FROM reservas WHERE id_reserva = ?';

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao deletar reserva' });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva não encontrada' });
        }
        return res.json({ mensagem: 'Reserva deletada com sucesso' });
    });
});


//O metodo listen() faz o servidor começar a escutar
// requisiçoes em uma determinada porta.
server.listen(3023, () => {
    console.log("Servidor rodando na porta 3023");
});
