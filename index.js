const firebird = require('node-firebird');
const configuracoes = {
  database: 'C:/Users/Desen-03/Documents/Jullia/Firebird/WA.fdb',
  user: 'SYSDBA',
  password: 'masterkey',
};

const pool = firebird.pool(5, configuracoes);

const executar = (query) => {
  return new Promise((resolver, rejeitar) => {
    pool.get((err, db) => {
      if (err) {
        rejeitar(err);
        return;
      }

      db.query(query, (erro, resultado) => {
        if (erro) {
          rejeitar(err);
          return;
        }

        db.detach();
        resolver(resultado);
      });
    });
  });
}

(async () => {
  console.log(await executar("insert into USUARIO (NOME, EMAIL, CNPJ, RAZAOSOCIAL, TELEFONE, CELULAR, CIDADE)  values ('JUULA', 'JU@GMAIL.COM', '000000t', 'JUUJU', null,'626262','BRASILIA') returning NOME"));
})();