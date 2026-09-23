const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ROTAS DE LIVROS

// GET /livros - Listar todos os livros
app.get('/livros', (req, res) => {
    connection.query('select * from Livro', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// GET /livros/ordenados - Listar livros ordenados por título
app.get('/livros/ordenados', (req, res) => {
    connection.query('select * from Livro order by Titulo asc', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// GET /livros/busca/:titulo - Buscar livros por título
app.get('/livros/busca/:titulo', (req, res) => {
    const { titulo } = req.params;
    connection.query('select * from Livro where Titulo like ?', [`%${titulo}%`], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// GET /livros/:id - Buscar livro por ID
app.get('/livros/:id', (req, res) => {
    connection.query('select * from Livro where Id_livro = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Livro não encontrado' });
        res.json(results[0]);
    });
});

// POST /livros - Cadastrar novo livro
app.post('/livros', (req, res) => {
    const { Titulo, Autor, Isbn, Ano_publicacao, Quantidade, Id_categoria } = req.body;
    connection.query(
        'insert into Livro (Titulo, Autor, Isbn, Ano_publicacao, Quantidade, Id_categoria) values (?, ?, ?, ?, ?, ?)',
        [Titulo, Autor, Isbn, Ano_publicacao, Quantidade, Id_categoria],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: results.insertId, message: 'Livro cadastrado com sucesso' });
        }
    );
});

// PUT /livros/:id - Atualizar dados do livro
app.put('/livros/:id', (req, res) => {
    const { Titulo, Autor, Isbn, Ano_publicacao, Quantidade, Id_categoria } = req.body;
    connection.query(
        'update Livro set Titulo = ?, Autor = ?, Isbn = ?, Ano_publicacao = ?, Quantidade = ?, Id_categoria = ? where Id_livro = ?',
        [Titulo, Autor, Isbn, Ano_publicacao, Quantidade, Id_categoria, req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Livro não encontrado' });
            res.json({ message: 'Livro atualizado com sucesso' });
        }
    );
});

// DELETE /livros/:id - Remover livro
app.delete('/livros/:id', (req, res) => {
    connection.query('delete from Livro where Id_livro = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Livro não encontrado' });
        res.json({ message: 'Livro removido com sucesso' });
    });
});

// ROTAS DE USUÁRIOS

// GET /usuarios - Listar todos os usuários
app.get('/usuarios', (req, res) => {
    connection.query('select * from Usuario', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// GET /usuarios/:id - Buscar usuário por ID
app.get('/usuarios/:id', (req, res) => {
    connection.query('select * from Usuario where Id_usuario = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(results[0]);
    });
});

// POST /usuarios - Cadastrar novo usuário
app.post('/usuarios', (req, res) => {
    const { Nome, Cpf, Email, Telefone } = req.body;
    connection.query(
        'insert into Usuario (Nome, Cpf, Email, Telefone) values (?, ?, ?, ?)',
        [Nome, Cpf, Email, Telefone],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: results.insertId, message: 'Usuário cadastrado com sucesso' });
        }
    );
});

// PUT /usuarios/:id - Atualizar dados do usuário
app.put('/usuarios/:id', (req, res) => {
    const { Nome, Cpf, Email, Telefone } = req.body;
    connection.query(
        'update Usuario set Nome = ?, Cpf = ?, Email = ?, Telefone = ? where Id_usuario = ?',
        [Nome, Cpf, Email, Telefone, req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
            res.json({ message: 'Usuário atualizado com sucesso' });
        }
    );
});

// DELETE /usuarios/:id - Remover usuário
app.delete('/usuarios/:id', (req, res) => {
    connection.query('delete from Usuario where Id_usuario = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário removido com sucesso' });
    });
});

// ROTAS DE EMPRÉSTIMOS

// GET /emprestimos - Listar todos os empréstimos
app.get('/emprestimos', (req, res) => {
    const sql = `
        select e.*, u.Nome as Nome_usuario, l.Titulo as Titulo_livro 
        from Emprestimo e
        inner join Usuario u on e.Id_usuario = u.Id_usuario
        inner join Livro l on e.Id_livro = l.Id_livro
    `;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// GET /emprestimos/:id - Buscar empréstimo por ID
app.get('/emprestimos/:id', (req, res) => {
    const sql = `
        select e.*, u.Nome as Nome_usuario, l.Titulo as Titulo_livro 
        from Emprestimo e
        inner join Usuario u on e.Id_usuario = u.Id_usuario
        inner join Livro l on e.Id_livro = l.Id_livro
        where e.Id_emprestimo = ?
    `;
    connection.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Empréstimo não encontrado' });
        res.json(results[0]);
    });
});

// POST /emprestimos - Registrar novo empréstimo
app.post('/emprestimos', (req, res) => {
    const { Id_livro, Id_usuario, Data_emprestimo, Data_prevista_devolucao, Status } = req.body;
    connection.query(
        'insert into Emprestimo (Id_livro, Id_usuario, Data_emprestimo, Data_prevista_devolucao, Status) values (?, ?, ?, ?, ?)',
        [Id_livro, Id_usuario, Data_emprestimo, Data_prevista_devolucao, Status || 'Ativo'],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: results.insertId, message: 'Empréstimo registrado com sucesso' });
        }
    );
});

// PUT /emprestimos/:id - Atualizar empréstimo
app.put('/emprestimos/:id', (req, res) => {
    const { Id_livro, Id_usuario, Data_emprestimo, Data_prevista_devolucao, Data_devolucao, Status } = req.body;
    connection.query(
        'update Emprestimo set Id_livro = ?, Id_usuario = ?, Data_emprestimo = ?, Data_prevista_devolucao = ?, Data_devolucao = ?, Status = ? where Id_emprestimo = ?',
        [Id_livro, Id_usuario, Data_emprestimo, Data_prevista_devolucao, Data_devolucao, Status, req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Empréstimo não encontrado' });
            res.json({ message: 'Empréstimo atualizado com sucesso' });
        }
    );
});


const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});