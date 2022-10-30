var http = require('http');

const express = require('express');
const cript = require("./cript");

const app = express();
const port = 3001;

const db = require("./db");

var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const { randomUUID } = require('crypto');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello Amelie e Dimitri meus amores! Estamos rodando mas esta mesmo atualizando!');
  });

app.get('/users', async (req, res, next) => {
    if(req.cookies["auth"] !== "true"){
        return res.status(401).send();  
    }
    console.log("Retornou todos usuarios da tabela nova!");
    var resp = await db.selectUsers()
    res.status(200).json(resp);
});

app.post('/register', async (req, res, next) => {
    console.log("entrou no register");
    const telefone = req.body.telefone;
    const datacadastro = req.body.datacadastro;
    try{
        const users = await db.insertUser(req.body.nomeusuario, req.body.email, cript.hash(req.body.senha),
             req.body.nomecompleto, telefone, datacadastro);
        if(users.affectedRows){
            console.log(`Usuário ${req.body.nomeusuario} registrado com sucesso!`);
            return res.status(201).send();
        }
    }catch(err){
        console.log(err);
        console.log(req.body.telefone)
        return res.status(err.code).json(err);
    }
});

app.post('/login', async (req, res, next) => {

    const login = await db.selectUserByLogin(req.body.nomeusuario);
    if(login.length && cript.validate(login[0].senha, req.body.senha)){ 
        console.log("Fez login e gerou token!");
        res.cookie("auth", "true");
        return res.status(200).send();
    }
    console.log(login[0]);
    console.log(req.body.senha);
    return res.status(401).send('Login inválido!');
});

app.post('/senha', async (req, res, next) => {

    try {
       const login = await db.updateSenhaByLogin(cript.hash(req.body.novasenha), req.body.nomeusuario);
       // const login = await db.updateSenhaByLogin(req.body.novasenha, req.body.nomeusuario, cript.hash(req.body.senha));

       // if(login.length){ //&& cript.validate(login[0].senha, req.body.senha)){ 
        console.log("Senha alterada com sucesso!");
        res.cookie("auth", "true");
        return res.status(200).send("Senha alterada com sucesso!");
       // }
    }catch(err){
        console.log(err);
    
    return res.status(401).send('Login inválido!');
    }
});

app.post('/logout', function(req, res) {
    console.log("Fez logout e cancelou o token!");
    res.cookie("auth", "false").status(200).send('done');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
