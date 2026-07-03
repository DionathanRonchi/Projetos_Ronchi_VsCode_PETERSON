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
    const sql = 'SELECT * FROM destinos WHERE pais_destino = ?';
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
//{ "nome_destino": "Roma", "pais_destino": "Itália" }
server.post('/destinos', (req, res) => {

    const { nome_destino, pais_destino } = req.body;

    if (!nome_destino || !pais_destino) {
        return res.status(400).json({ error: 'Os campos nome_destino e pais_destino são obrigatórios' });
    }

    const sql = 'INSERT INTO destinos (nome_destino, pais_destino) VALUES (?, ?)';

    connection.query(sql, [nome_destino, pais_destino], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json({
            mensagem: 'Destino cadastrado com sucesso',
            id: resultados.insertId,
            nome_destino: nome_destino,
            pais_destino: pais_destino
        });
    });
});

//Método HTTP: PUT
//ATUALIZAR UM DESTINO
//localhost:3023/destinos/1
//{ "nome_destino": "Rio de Janeiro", "pais_destino": "Brasil" }
server.put('/destinos/:id', (req, res) => {

    const id = req.params.id;
    const { nome_destino, pais_destino } = req.body;

    if (!nome_destino || !pais_destino) {
        return res.status(400).json({ error: 'Os campos nome_destino e pais_destino são obrigatórios' });
    }

    const sql = 'UPDATE destinos SET nome_destino = ?, pais_destino = ? WHERE id_destino = ?';

    connection.query(sql, [nome_destino, pais_destino, id], (erro, resultados) => {
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


//O metodo listen() faz o servidor começar a escutar
// requisiçoes em uma determinada porta.
server.listen(3023, () => {
    console.log("Servidor rodando na porta 3023");
});