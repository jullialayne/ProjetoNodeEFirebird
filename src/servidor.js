const express = require("express");
const path = require('path');
const roteador = require("./rotas");
const cors = require('cors');
const db = require('./database');

const servidor = express();



servidor.use(express.json()); 
servidor.use(cors());
servidor.use(roteador);

const porta = 3333;

servidor.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
})



/*const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.listen(3000);*/