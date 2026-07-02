//Importa o framework express
const express = require('express');
const connection = require('./db');
const server = express();

//Middleware que permite o servidor entender requisições com JSON no corpo (req.body)
server.use(express.json());

const cursos = ['Node JS', 'JavaScript', 'React Native'];

//===================================
//Método HTTP: GET
//LISTAR TODOS OS CURSOS
//localhost:3000/cursos
server.get('/cursos', (req, res) => {
    const sql = 'SELECT * FROM cursos';
    connection.query(sql, (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao buscar cursos' });
        }
        return res.json(resultados);
    });
});

//Método HTTP: GET
//LISTAR UM UNICO CURSO
//localhost:3000/curso/2
server.get('/cursos/:id', (req, res) => {
    const id = req.params.id;
const sql = 'SELECT * FROM cursos WHERE id = ?';
    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            console.log('Erro ao executar a consulta:', erro);
            return res.status(500).json({ error: 'Erro ao buscar curso' });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        return res.json(resultados[0]);
    });
});

//Método HTTP: POST
//CRIAR UM NOVO CURSO
//localhost:3000/cursos
//{ "name": "Curso de Python" }
server.post('/cursos', (req, res)=> {

    const { nome } = req.body;
    const sql = 'insert into cursos (nome) values (?)';

    connection.query(sql, [nome], (erro, resultados) => {
        if(erro){
            return res.status(500).json({erro: erro.message})
        }
        return res.json({
            mensagem: 'Curso cadastrado com sucesso',
            id: resultados.insertId,
            nome: nome
        });
    });
});

//Método HTTP: PUT
//ATUALIZAR UM CURSO
//localhost:3000/cursos/0
server.put('/cursos/:id', (req, res) => {

    // Obtém o índice do curso a ser atualizado pela URL
    const id = req.params.id;

    // Obtém o novo nome do curso enviado no corpo da requisição
    const nome = req.body.nome;

    // Atualiza o curso no índice informado
    cursos[id] = nome;

    // Retorna a lista de cursos atualizada
    return res.json(cursos);

});

//Método HTTP: DELETE
//DELETAR UM CURSO
//localhost:3000/cursos/1
server.delete('/cursos/:id', (req, res) => {

const { id } = req.params;
const sql = 'DELETE FROM cursos WHERE id = ?';

connection.query(sql, [id], (erro, resultados) => {
    if (erro) {
        console.log('Erro ao executar a consulta:', erro);
        return res.status(500).json({ error: 'Erro ao deletar curso' });
    }
    return res.json({ mensagem: 'Curso deletado com sucesso' });
});


});



//O metodo listen() faz o servidor começar a escutar
// requisiçoes em uma determinada porta.
server.listen(3023 , () => {
    console.log("Servidor rodando na porta 3002");
});
