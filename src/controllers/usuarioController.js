const UsuarioModel = require('../models/usuarios');
const db = require('../database/index');

//const bcrypt = require('bcrypt');

module.exports = {
  async criarUsuario(request, response) {
   
    const {NOME, EMAIL, CNPJ, RAZAOSOCIAL, TELEFONE, CELULAR, CIDADE} = request.body;
    
    const user = await db.executar(`insert into USUARIO (NOME, EMAIL, CNPJ, RAZAOSOCIAL, TELEFONE, CELULAR, CIDADE)  `+
    `values ('${NOME}', '${EMAIL}', '${CNPJ}', '${RAZAOSOCIAL}', '${TELEFONE}','${CELULAR}','${CIDADE}') returning NOME`);
    
    
    return response.json({
      mensagem: `usuario : ${user} cadastrado com sucesso`
    }); 
  },

  async listarUsuarios(request, response) {

    const users =  await db.executar("select * from usuario");
    
   return response.json(users);
  },
/*
  async listarUmUsuario(requisicao, resposta) {

    
    const{ id} = requisicao.body;
    
    const usuario = await UsuarioModel.findById(id);
    (async () => {
      console.log(await executar("insert into USUARIO (NOME, EMAIL, CNPJ, RAZAOSOCIAL, TELEFONE, CELULAR, CIDADE)  "+
      "values ('JUULA', 'JU@GMAIL.COM', '000000t', 'JUUJU', null,'626262','BRASILIA') returning NOME"));
    })();
    
//    return resposta.json(usuario);
  },

 /* async autenticarUsuario(requisicao, resposta) {

    const { email, senha} = requisicao.body;
     
    
    const usuario = await UsuarioModel.findOne({"email":`${email}`});
     match = false;
   
    bcrypt.compare(senha, usuario.senha, function(err, result) {
      if(result==true){
        return resposta.json(usuario);
      }else{
        return resposta.json(false);
      }
  });

      
  },*/
  async editarUsuario(request, response){
    const {ID_USUARIO,NOME, EMAIL, CNPJ, RAZAOSOCIAL, TELEFONE, CELULAR, CIDADE} = request.body;
  
    try{
      await db.executar(`UPDATE USUARIO SET NOME ='${NOME}', EMAIL = '${EMAIL}', CNPJ = '${CNPJ}', RAZAOSOCIAL = '${RAZAOSOCIAL}', `
      +`TELEFONE = '${TELEFONE}',CELULAR='${CELULAR}',CIDADE='${CIDADE}'`+
      `where ID_USUARIO = ${ID_USUARIO} returning NOME`);return response.json('ok');
    }catch{return response.json("Não atualizou")}   
     
  },
async  remove(requisicao,resposta){
 const {ID_USUARIO}  = requisicao.body;
  console.log(requisicao.body);
  
  const remove =(await db.executar(`DELETE FROM usuario WHERE ID_USUARIO = ${ID_USUARIO} returning NOME`));
  
  resposta.json({'mensagem': remove});
  
}


};