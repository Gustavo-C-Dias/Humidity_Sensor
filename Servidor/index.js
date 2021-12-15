const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const rotas = require('./routes/index')

const server = express()

server.use(session({
    secret: 'adgjmpsvyxurolifcz', //md5 SHA128
    resave: true,
    saveUninitialized: true
}));

server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.set("views", path.resolve(__dirname, "views"));
server.use(express.static(__dirname + '/public'));

server.use('/', rotas)
server.use('/Login', rotas)
server.use('/Cadastro', rotas)
server.use('/Sobre', rotas)
server.use('/Ajuda', rotas)
server.use('/EsqueciSenha', rotas)
server.use('/Principal', rotas)
server.use('/Principal/Desconectar', rotas)
server.use('/Principal/Plantacao', rotas)
server.use('/Principal/Sensores', rotas)
server.use('/Principal/Grafico', rotas)
server.use('/Principal/Media', rotas)

server.listen(8080, () => console.log("⚡ Servidor HTTP inicializado!"))