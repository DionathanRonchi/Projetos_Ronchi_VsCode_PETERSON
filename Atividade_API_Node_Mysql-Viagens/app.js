const express = require('express');
const connection = require('./db');
const server = express();

//Middleware que permite o servidor entender requisições com JSON no corpo (req.body)
server.use(express.json());

//===================================
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


//O metodo listen() faz o servidor começar a escutar
// requisiçoes em uma determinada porta.
server.listen(3023, () => {
    console.log("Servidor rodando na porta 3023");
});