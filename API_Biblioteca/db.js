const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'Biblioteca',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection.getConnection((erro, conn) => {
    if (erro) {
        if (erro.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Conexão perdida com o banco de dados');
        } else if (erro.code === 'ER_CON_COUNT_ERROR') {
            console.error('Muitas conexões com o banco de dados');
        } else if (erro.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Acesso negado ao banco de dados - Verifique usuário e senha');
        } else if (erro.code === 'ER_BAD_DB_ERROR') {
            console.error('Banco de dados não existe');
        } else {
            console.error('Erro ao conectar ao banco de dados:', erro.message);
        }
        return;
    }
    console.log('Banco de dados conectado com sucesso!');
    conn.release();
});

module.exports = connection;