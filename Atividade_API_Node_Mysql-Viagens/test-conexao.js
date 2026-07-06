const mysql = require('mysql2');

console.log('🔍 Testando conexão com MySQL...\n');

// Teste 1: Conexão básica
console.log('📝 Teste 1: Conexão básica (sem banco de dados)');
const testConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root'
});

testConnection.connect((erro) => {
    if (erro) {
        console.log('❌ Erro de conexão:', erro.message);
        console.log('\nVerifique:');
        console.log('1. MySQL está realmente rodando?');
        console.log('2. Usuário: root');
        console.log('3. Senha: root');
        console.log('4. Host: localhost');
        console.log('5. Porta: 3306');
        console.log('\nTente iniciar o MySQL no Prompt de Comando:');
        console.log('   mysql -u root -p');
        return;
    }

    console.log('✅ Conexão básica bem-sucedida!\n');

    // Teste 2: Listar bancos de dados
    console.log('📝 Teste 2: Bancos de dados existentes');
    testConnection.query('SHOW DATABASES', (erro, resultados) => {
        if (erro) {
            console.log('❌ Erro ao listar bancos:', erro.message);
        } else {
            console.log('✅ Bancos de dados:');
            resultados.forEach(db => {
                console.log('   -', Object.values(db)[0]);
            });
        }

        // Teste 3: Conectar ao banco de dados específico
        console.log('\n📝 Teste 3: Conectando ao banco "agencia_viagens"');
        const dbConnection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'agencia_viagens'
        });

        dbConnection.connect((erro) => {
            if (erro) {
                if (erro.code === 'ER_BAD_DB_ERROR') {
                    console.log('❌ Banco de dados "agencia_viagens" não existe!');
                    console.log('\n🛠️  Criando banco de dados...');
                    
                    testConnection.query('CREATE DATABASE agencia_viagens', (erro) => {
                        if (erro) {
                            console.log('❌ Erro ao criar banco:', erro.message);
                        } else {
                            console.log('✅ Banco "agencia_viagens" criado com sucesso!');
                            console.log('\n📝 Teste 4: Criando tabela "destinos"');
                            
                            const sqlCreateTable = `
                                CREATE TABLE destinos (
                                    id_destino INT AUTO_INCREMENT PRIMARY KEY,
                                    nome_destino VARCHAR(100) NOT NULL,
                                    pais_destino VARCHAR(50) NOT NULL
                                )
                            `;
                            
                            testConnection.query(sqlCreateTable, (erro) => {
                                if (erro) {
                                    console.log('❌ Erro ao criar tabela:', erro.message);
                                } else {
                                    console.log('✅ Tabela "destinos" criada com sucesso!');
                                }
                                encerrar();
                            });
                        }
                    });
                } else {
                    console.log('❌ Erro ao conectar ao banco:', erro.message);
                    encerrar();
                }
            } else {
                console.log('✅ Conectado ao banco "agencia_viagens"!\n');
                
                // Teste 4: Verificar tabela
                console.log('📝 Teste 4: Verificando tabela "destinos"');
                dbConnection.query('SHOW TABLES', (erro, resultados) => {
                    if (erro) {
                        console.log('❌ Erro ao listar tabelas:', erro.message);
                    } else {
                        const tabelas = resultados.map(t => Object.values(t)[0]);
                        if (tabelas.includes('destinos')) {
                            console.log('✅ Tabela "destinos" existe!');
                            
                            // Verificar estrutura
                            dbConnection.query('DESCRIBE destinos', (erro, resultados) => {
                                if (erro) {
                                    console.log('❌ Erro ao descrever tabela:', erro.message);
                                } else {
                                    console.log('✅ Estrutura da tabela:');
                                    resultados.forEach(col => {
                                        console.log(`   - ${col.Field}: ${col.Type}`);
                                    });
                                }
                                encerrar();
                            });
                        } else {
                            console.log('⚠️  Tabela "destinos" não existe. Criando...');
                            
                            const sqlCreateTable = `
                                CREATE TABLE destinos (
                                    id_destino INT AUTO_INCREMENT PRIMARY KEY,
                                    nome_destino VARCHAR(100) NOT NULL,
                                    pais_destino VARCHAR(50) NOT NULL
                                )
                            `;
                            
                            dbConnection.query(sqlCreateTable, (erro) => {
                                if (erro) {
                                    console.log('❌ Erro ao criar tabela:', erro.message);
                                } else {
                                    console.log('✅ Tabela "destinos" criada com sucesso!');
                                }
                                encerrar();
                            });
                        }
                    }
                });
            }
        });
    });

    function encerrar() {
        testConnection.end();
        if (dbConnection && dbConnection.state !== 'disconnected') {
            dbConnection.end();
        }
        console.log('\n✅ Testes concluídos!');
    }
});
