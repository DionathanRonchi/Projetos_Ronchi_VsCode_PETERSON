const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'escola'
});

connection.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar ao banco de dados:', erro);
        return;
    }
    console.log('Banco conectado com sucesso!');
});

module.exports = connection;   


