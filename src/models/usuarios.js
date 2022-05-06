const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    ID_USUARIO: Number,
    NOME: String,
    EMAIL:String,
    CNPJ:String,
    RAZAOSOCIAL:String,
    TELEFONE:String,
    CELULAR:String,
    CIDADE:String, 
    SENHA:String 
})
const Model = mongoose.model('Usuario', schema)

module.exports = Model;