const bcrypt = require('bcrypt');
const { response } = require('express');
// Create User
async function crypto(senha){
    const salt = await bcrypt.genSalt()
    const senhaCripto = await bcrypt.hash(senha, salt)
    return senhaCripto
}
// Login

async function decrypto(senha,senhaCriptografada){
   
    bcrypt.compare(senha, senhaCriptografada, function(err, result) {
        return response.json(result);
    });
      
}


module.exports = {
    crypto,decrypto
}