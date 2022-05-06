const firebird = require('node-firebird');
const configuracoes = {
  database: 'C:/Users/Desen-03/Documents/Jullia/Firebird/WA.fdb',
  user: 'SYSDBA',
  password: 'masterkey',
};

const pool = firebird.pool(5, configuracoes);

function executar(query) {
  return new Promise((resolver, rejeitar) => {
    pool.get((err, db) => {
      if (err) {
        rejeitar(err);
        
        console.log("Nao deu1");
        return ;
      }

      db.query(query, (erro, resultado) => {
        if (erro) {
          rejeitar(err);
            console.log("Nao deu2");
         
            console.log(query);
          return;
        }

        db.detach();
        resolver(resultado);
        console.log("Deu");
      });
    });
  });
}



module.exports={executar}