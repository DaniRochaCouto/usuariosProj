const jwt = require("jsonwebtoken");
const cfg = require("../config/cfg");

//Ação 4 - gerar token com jason web token
const criar_token = (id, nomeusuario) => {
    return jwt.sign({ id: id, nomeusuario: nomeusuario}, cfg.jwt_secret, {
        expiresIn: cfg.jwt_expires,
    });
}

module.exports = criar_token;