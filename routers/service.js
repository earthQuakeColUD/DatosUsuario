"use strict"

const express = require("express"),
  app = express(),
  logicaUsuario = require("./logicaUsuario");

app.post("/crearUsuario", (req, res) => {
  logicaUsuario.crearUsuari(req.body).then(response => {
    res.json(JSON.parse(JSON.stringify(response)))
  })
    .catch(err => console.log(err));
})

app.post("/validarAutenticacion", (req, res) => {

  var response = logicaUsuario.validarCuenta(req.body)
    .then(r => {
      res.json(JSON.parse(JSON.stringify(r)))
    })

})

app.post("/Modificar", (req, res) => {

  logicaUsuario.modificar(req.body)
    .then(r => {
      res.json(JSON.parse(JSON.stringify(r)))
    })
})

app.post("/recuperar", (req, res) => {

  logicaUsuario.recuperar(req.body)
    .then(r => {
      res.json(JSON.parse(JSON.stringify(r)))
    })

})

app.get("/allUser", (req, res) => {
  logicaUsuario.usuariosTodos(req.body)
    .then(r => {
      res.json(JSON.parse(JSON.stringify(r)))
    })
})

module.exports = app