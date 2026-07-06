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
    const sql = 'SELECT * FROM reservas WHERE Destino_ID = ?';
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
    const sql = 'SELECT * FROM destinos WHERE ID = ?';
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
    const sql = 'SELECT * FROM destinos WHERE País = ?';
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
//{ "Nome": "Roma", "País": "Itália" }
server.post('/destinos', (req, res) => {

    const { Nome, País } = req.body;

    if (!Nome || !País) {
        return res.status(400).json({ error: 'Os campos Nome e País são obrigatórios' });
    }

    const sql = 'INSERT INTO destinos (Nome, País) VALUES (?, ?)';

    connection.query(sql, [Nome, País], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json({
            mensagem: 'Destino cadastrado com sucesso',
            id: resultados.insertId,
            Nome: Nome,
            País: País
        });
    });
});

//Método HTTP: PUT
//ATUALIZAR UM DESTINO
//localhost:3023/destinos/1
//{ "Nome": "Rio de Janeiro", "País": "Brasil" }
server.put('/destinos/:id', (req, res) => {

    const id = req.params.id;
    const { Nome, País } = req.body;

    if (!Nome || !País) {
        return res.status(400).json({ error: 'Os campos Nome e País são obrigatórios' });
    }

    const sql = 'UPDATE destinos SET Nome = ?, País = ? WHERE ID = ?';

    connection.query(sql, [Nome, País, id], (erro, resultados) => {
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
    const sql = 'DELETE FROM destinos WHERE ID = ?';

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
    const sql = 'SELECT * FROM clientes ORDER BY Nome ASC';
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
    const sql = 'SELECT * FROM reservas WHERE Cliente_ID = ?';
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
    const sql = 'SELECT * FROM clientes WHERE ID = ?';
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
//{ "Nome": "Maria Silva", "Email": "maria@email.com", "Telefone": "47999998888" }
server.post('/clientes', (req, res) => {

    const { Nome, Email, Telefone } = req.body;

    if (!Nome || !Email || !Telefone) {
        return res.status(400).json({ error: 'Os campos Nome, Email e Telefone são obrigatórios' });
    }

    const sql = 'INSERT INTO clientes (Nome, Email, Telefone) VALUES (?, ?, ?)';

    connection.query(sql, [Nome, Email, Telefone], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json({
            mensagem: 'Cliente cadastrado com sucesso',
            id: resultados.insertId,
            Nome: Nome,
            Email: Email,
            Telefone: Telefone
        });
    });
});

//Método HTTP: PUT
//ATUALIZAR UM CLIENTE
//localhost:3023/clientes/1
//{ "Nome": "Maria Silva", "Email": "maria@email.com", "Telefone": "47999998888" }
server.put('/clientes/:id', (req, res) => {

    const id = req.params.id;
    const { Nome, Email, Telefone } = req.body;

    if (!Nome || !Email || !Telefone) {
        return res.status(400).json({ error: 'Os campos Nome, Email e Telefone são obrigatórios' });
    }

    const sql = 'UPDATE clientes SET Nome = ?, Email = ?, Telefone = ? WHERE ID = ?';

    connection.query(sql, [Nome, Email, Telefone, id], (erro, resultados) => {
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
    const sql = 'DELETE FROM clientes WHERE ID = ?';

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
    const sql = 'SELECT * FROM reservas';
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
    const sql = 'SELECT * FROM reservas WHERE ID = ?';
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
//{ "Cliente_ID": 1, "Destino_ID": 2, "Data_Viagem": "2026-08-15" }
server.post('/reservas', (req, res) => {

    const { Cliente_ID, Destino_ID, Data_Viagem } = req.body;

    if (!Cliente_ID || !Destino_ID || !Data_Viagem) {
        return res.status(400).json({ error: 'Os campos Cliente_ID, Destino_ID e Data_Viagem são obrigatórios' });
    }

    const sql = 'INSERT INTO reservas (Cliente_ID, Destino_ID, Data_Viagem) VALUES (?, ?, ?)';

    connection.query(sql, [Cliente_ID, Destino_ID, Data_Viagem], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json({
            mensagem: 'Reserva cadastrada com sucesso',
            id: resultados.insertId,
            Cliente_ID: Cliente_ID,
            Destino_ID: Destino_ID,
            Data_Viagem: Data_Viagem
        });
    });
});

//Método HTTP: PUT
//ATUALIZAR UMA RESERVA
//localhost:3023/reservas/1
//{ "Cliente_ID": 1, "Destino_ID": 2, "Data_Viagem": "2026-08-20" }
server.put('/reservas/:id', (req, res) => {

    const id = req.params.id;
    const { Cliente_ID, Destino_ID, Data_Viagem } = req.body;

    if (!Cliente_ID || !Destino_ID || !Data_Viagem) {
        return res.status(400).json({ error: 'Os campos Cliente_ID, Destino_ID e Data_Viagem são obrigatórios' });
    }

    const sql = 'UPDATE reservas SET Cliente_ID = ?, Destino_ID = ?, Data_Viagem = ? WHERE ID = ?';

    connection.query(sql, [Cliente_ID, Destino_ID, Data_Viagem, id], (erro, resultados) => {
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
    const sql = 'DELETE FROM reservas WHERE ID = ?';

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