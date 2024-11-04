const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Configuração do middleware
app.use(bodyParser.json());

// Configuração do banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run(`CREATE TABLE IF NOT EXISTS usuario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      Telefone TEXT NOT NULL,
      CpfCnpj TEXT NOT NULL,
      Endereco TEXT NOT NULL,
      Email TEXT NOT NULL UNIQUE,
      Senha TEXT NOT NULL,
      Tipo TEXT NOT NULL
    )`);
  }
});

// Rota para registrar usuário
app.post('/register', async (req, res) => {
  try {
    const { CpfCnpj, nome, Telefone, Endereco, Email, Senha, Tipo } = req.body;

    const hashSenha = await bcrypt.hash(Senha, 10);

    const sql = `INSERT INTO usuario (nome, Telefone, CpfCnpj, Endereco, Email, Senha, Tipo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [nome, Telefone, CpfCnpj, Endereco, Email, hashSenha, Tipo];

    db.run(sql, values, function(err) {
      if (err) {
        console.error('Erro ao inserir dados no banco de dados:', err.message);
        return res.status(500).json({ message: 'Erro ao inserir dados no banco de dados.' });
      }
      console.log(`Um registro inserido com id ${this.lastID}`);
      res.json({ message: 'Usuário registrado com sucesso.' });
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
