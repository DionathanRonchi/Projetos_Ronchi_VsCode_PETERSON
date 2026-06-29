//Importa o framework express
const express = require('express');
const server = express();

//Middleware que permite o servidor entender requisições com JSON no corpo (req.body)
server.use(express.json());

const cursos = ['Node JS', 'JavaScript', 'React Native'];



//Middleware Global
//Middleware global que será executado em todas as requisições
server.use((req, res, next) => {
    console.log("REQUISIÇÃO CHEGOU!");
    return next();
});

//Middleware Local
//Verificar se o o id do curso existe
function idCursoExiste(req, res, next) {
const curso = cursos[req.params.id];
if (!curso) {
    return res.status(400).json({ error: 'Curso não encontrado' });
}
return next();
}



//===================================
//Método HTTP: GET
//LISTAR TODOS OS CURSOS
//localhost:3000/cursos
server.get('/cursos', (req, res) => {
    // Retorna a lista completa de cursos em formato JSON
    return res.json(cursos);
});

//Método HTTP: GET
//LISTAR UM UNICO CURSO
//localhost:3000/curso/2
server.get('/cursos/:id', idCursoExiste, (req, res) => {

    // Desestrutura o parâmetro "index" vindo da URL
    const id = req.params.id;        

    // Retorna o curso correspondente ao índice informado
    return res.json(cursos[id]);
});

//Método HTTP: POST
//CRIAR UM NOVO CURSO
//localhost:3000/cursos
//{ "name": "Curso de Python" }
server.post('/cursos', (req, res)=> {

    // Desestrutura a propriedade "name" enviada no corpo da requisição
    const nome = req.body.nome;

    // Adiciona o novo curso ao array de cursos
    cursos.push(nome);

    // Retorna a lista atualizada de cursos
    return res.json(cursos);    
});

//Método HTTP: PUT
//ATUALIZAR UM CURSO
//localhost:3000/cursos/0
server.put('/cursos/:id', idCursoExiste, (req, res) => {

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
server.delete('/cursos/:id',idCursoExiste, (req, res) => {

    // Obtém o índice do curso a ser removido
    const id = req.params.id;

    // Remove 1 elemento do array a partir do índice informado
    cursos.splice(id, 1);

    // Retorna a lista de cursos após a exclusão
    return res.json(cursos);
});



//O metodo listen() faz o servidor começar a escutar
// requisiçoes em uma determinada porta.
server.listen(3023 , () => {
    console.log("Servidor rodando na porta 3002");
});