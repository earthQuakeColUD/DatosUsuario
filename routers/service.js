"use strict"

const express = require("express"),
  app = express(),
  logicaUsuario = require("./logicaUsuario");

app.post("/crearUsuario", (req, res) => {
  console.log("req");
  console.log(req.body)
  logicaUsuario.crearUsuari(req.body).then(response => {
    res.json(JSON.parse(JSON.stringify(response)))
  })
    .catch(err => console.log(err));
})

app.post("/validarAutenticacion", (req, res) => {
  console.log("req");
  console.log(req.body)
  var response = logicaUsuario.validarCuenta(req.body)
    .then(r => {
      console.log("respuesta principal" + r)
      res.json(JSON.parse(JSON.stringify(r)))
    })

})

app.post("/Modificar", (req, res) => {
  console.log("req Modificar");
  console.log(req.body)
  logicaUsuario.modificar(req.body)
    .then(r => {
      console.log("respuesta principal" + r)
      res.json(JSON.parse(JSON.stringify(r)))
    })
})

app.post("/recuperar", (req, res) => {
  console.log("req");
  console.log(req.body)
  logicaUsuario.recuperar(req.body)
    .then(r => {
      console.log("respuesta principal" + r)
      res.json(JSON.parse(JSON.stringify(r)))
    })

})

app.get("/allUser", (req, res) => {
  console.log("req allUser");
  logicaUsuario.usuariosTodos(req.body)
    .then(r => {
      console.log("respuesta principal" + r)
      res.json(JSON.parse(JSON.stringify(r)))
    })
})

module.exports = app