const UsuarioModel = require('../models/usuarios');
const db = require('../database/index');

const bcrypt = require('bcrypt');

module.exports = {
  async criarUsuario(request, response) {
   
    const {NOME, EMAIL, CNPJ, RAZAOSOCIAL, TELEFONE, CELULAR, CIDADE,SENHA} = request.body;

    const existeEmail = (await db.executar(`select * from usuario where EMAIL='${EMAIL}' `));
 
    const salt = await bcrypt.genSalt();
    const senhaCripto = await bcrypt.hash(SENHA, salt);

    if(!existeEmail[0]){
      const user = await db.executar(`insert into USUARIO (NOME, EMAIL, CNPJ, RAZAOSOCIAL, TELEFONE, CELULAR, CIDADE,SENHA)  `+
      `values ('${NOME}', '${EMAIL}', '${CNPJ}', '${RAZAOSOCIAL}', '${TELEFONE}','${CELULAR}','${CIDADE}','${senhaCripto}') returning NOME`);
      return response.json({
        mensagem: `usuario : ${EMAIL} cadastrado com sucesso`
      }); 
    }else{
      return response.json({
        mensagem: `usuario : ${EMAIL} ja possui cadastro`
      });
    }
    
  
    
    
    
  },

  async listaUsuarios(request, response) {

    const users =  await db.executar("select * from usuario");
    
   return response.json(users);
  },

  async listaUsuario(request, response) {
 
     const{ ID_USUARIO} = request.params;
    
         const user =  (await db.executar(`select * from usuario where ID_USUARIO=${ID_USUARIO} `));
      
        return response.json(user[0]);
  },
 async autenticarUsuario(request, response) {

    const { EMAIL, SENHA} = request.body;
     
    
    const user = (await db.executar(`select * from usuario where EMAIL='${EMAIL}' `));
     
    match = false;

    bcrypt.compare(SENHA, user[0].SENHA, function(err, result) {
      if(result==true){
        return response.json(user[0]);
      }else{
        return response.json(false);
      }
  });

      
  },
  async editarUsuario(request, response){
    const {ID_USUARIO,NOME, EMAIL, CNPJ, RAZAOSOCIAL, TELEFONE, CELULAR, CIDADE,SENHA} = request.body;
  
    try{
      await db.executar(`UPDATE USUARIO SET NOME ='${NOME}', EMAIL = '${EMAIL}', CNPJ = '${CNPJ}', RAZAOSOCIAL = '${RAZAOSOCIAL}', `
      +`TELEFONE = '${TELEFONE}',CELULAR='${CELULAR}',CIDADE='${CIDADE}',SENHA='${SENHA}'`+
      `where ID_USUARIO = ${ID_USUARIO} returning NOME`);return response.json('ok');
    }catch{return response.json("Não atualizou")}   
     
  },
async  remove(requisicao,resposta){
 const {ID_USUARIO}  = requisicao.body;
  
  const remove =(await db.executar(`DELETE FROM usuario WHERE ID_USUARIO = ${ID_USUARIO} returning NOME`));

  if(!remove.NOME){
    resposta.json({'mensagem': 'nao possui'});
  }else{
    resposta.json({'mensagem': remove});
  }
  
  
}


};