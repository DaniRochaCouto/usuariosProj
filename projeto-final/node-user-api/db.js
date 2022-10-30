const { randomUUID } = require('crypto');

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: 3306,
        user: 'test',
        password: 'test',
        database: 'ProjFinalUser',
        multipleStatements: true
      } );
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function selectUsers(){
    const conn = await connect();

    const query = `SELECT * FROM users LIMIT 1000;`;
    console.log(`Executando query: ${query}`);

    const [rows, fields] = await conn.execute(query);
    console.log(`Rows: ${JSON.stringify(rows)}`);
    return rows;
}

async function selectUserByLogin(nomeusuario){
    const conn = await connect();

    const query = "SELECT * FROM `users` WHERE `nomeusuario` = ? ";
    console.log(`Executando query: ${query}`);

    const [rows, fields] = await conn.execute(query, [nomeusuario]);

    return rows;
}
async function updateSenhaByLogin(novasenha, nomeusuario){
    const conn = await connect();

    const query = "UPDATE `users` SET `senha` = ? WHERE `nomeusuario` =  ?";
    console.log(`Executando query: ${query}`);

    try{
        const [rows, fields] = await conn.execute(query, [novasenha, nomeusuario]);
        return rows;
    }catch(err){
        if(err.errno === 1062){
            throw {code: 500, message: 'Erro ao trocar senha: Usuário não existe'};
        }else{
            throw {code: 500, message: 'Erro inesperado ao tentar trocar senha'};
        }
    }
}

async function insertUser(nomeusuario, email, senha, nomecompleto, telefone, datacadastro){
    const conn = await connect();

    const query = "INSERT INTO users (id, nomeusuario, email, senha, nomecompleto, telefone, datacadastro) VALUES (?, ?, ?, ?, ?, ?, ?);";
    console.log(`Executando query: ${query}`);

    try{
        const [rows, fields] = await conn.execute(query, [randomUUID(), nomeusuario, email, senha, nomecompleto
        , telefone, datacadastro]);
        return rows;
    }catch(err){
        if(err.errno === 1062){
            throw {code: 500, message: 'Erro ao cadastrar usuário: Usuário já existe'};
        }else{
            throw {code: 500, message: 'Erro inesperado ao tentar cadastrar usuário'};
        }
    }
}

module.exports = {selectUserByLogin,selectUsers, insertUser, updateSenhaByLogin}
