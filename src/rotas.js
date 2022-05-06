const { Router } = require("express");
const usuarioController = require("./controllers/usuarioController");

const roteador = Router();


roteador.post('/criaUsuario', usuarioController.criarUsuario);
roteador.get('/listaUsuarios', usuarioController.listaUsuarios);
roteador.put('/editaUsuario', usuarioController.editarUsuario);
roteador.delete('/removeUsuario', usuarioController.remove);

roteador.get('/listaUsuario/:ID_USUARIO', usuarioController.listaUsuario);

roteador.post('/autenticaUsuario', usuarioController.autenticarUsuario);
module.exports = roteador;