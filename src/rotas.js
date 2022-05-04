const { Router } = require("express");
const usuarioController = require("./controllers/usuarioController");

const roteador = Router();


roteador.post('/criaUsuario', usuarioController.criarUsuario);
roteador.get('/listaUsuarios', usuarioController.listarUsuarios);
roteador.put('/editaUsuario', usuarioController.editarUsuario);
roteador.delete('/removeUsuario', usuarioController.remove);

/*
roteador.post('/autenticarUsuario', usuarioController.autenticarUsuario);*/
module.exports = roteador;