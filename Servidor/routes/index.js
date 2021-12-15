const { decodeBase64 } = require('bcryptjs');
const express = require('express');
const router = express.Router();
const bd = require("../config/database.js")

router.get("/", function (req, res) {
    res.render("Index");
})

router.get("/Login", function (req, res) {
    res.render("Login");
})

router.post('/Login', async (req, res) => {
    if (req.session.login > 0) {
        return res.json(req.session.login)
    } else {
        var usuario = await bd.consulta_Usuario(req.body.login, req.body.senha)
        console.log(usuario)
        if (usuario === "Nulo"){
            return res.json (usuario)
        } else {
            usuario.forEach((element) => {
                req.session.login = (element.id_cliente)
                return res.json(req.session.login)
        })}
    }
})

router.get("/Cadastro", function (req, res) {
    res.render("Cadastro");
})

router.post('/Cadastro', async (req, res) => {
    var retorno = await bd.cadastro_Usuario(req.body.name, req.body.email, req.body.senha, req.body.datanasc)
    if (retorno > 0) {
        retorno.forEach((element) => {
            return res.json(element.insertId)
        })
    } else {
        return res.json(retorno)
    }
});

router.get("/Sobre", function (req, res) {
    res.render("Sobre");
})

router.get("/Ajuda", function (req, res) {
    res.render("Ajuda");
})

router.get("/Esqueci_Senha", function (req, res) {
    res.render("EsqSenha");
})

router.post("/Esqueci_Senha", async function (req, res) {
    //Em andamento
    const senha = await bd.esqueci_Senha(res.body.email)
    return res.json("/Login")
})

router.post("/Principal/CadastroPlantacao", async function (res, res){
    await bd.CadastrarPlantacao(req.nome, req.observacao, req.tipo, req.session.login)
})

router.get('/Principal', async function (req, res) {
    if (req.session.login > 0) {
        res.render("Principal")
        // Slides de aviso de plnatação;
            //Definir um valor médio (700 - 400)
        // Slide de aviso de sensores;
            //Problemas frequente de registros
            //Ver se não está muito proximo de 1023
    } else {
        res.redirect("/Login")
    }
})

router.post('/Principal/Desconectar', async function (req, res){
    if(req.session.login > 0){
        req.session.login = 0;
    }
    return res.json(req.session.login)
})

router.post('/Principal/Plantacao', async function (req, res){
    var retorno = await bd.lavoura_Principal(req.session.login);
    if ([retorno].length > 0) {
        return res.json(retorno)
    } else {
        return res.json(0)
    }
})

router.post('/Principal/Sensores', async function (req, res){
    var retorno = await bd.Sensor_Principal(req.session.login)
    console.log(retorno)
    if (retorno.length > 0){
        return res.json(retorno)
    } else 
        return res.json(0)
})

router.post('/Principal/Grafico', async function (req, res){
    var retorno = await bd.Dados_Grafico(req.session.login)
    return res.json(retorno)
})

router.post('/Principal/Media' , async function (req, res) {
    var retorno = await bd.Media_Dados(req.session.login)
    return res.json(retorno)
})

module.exports = router;