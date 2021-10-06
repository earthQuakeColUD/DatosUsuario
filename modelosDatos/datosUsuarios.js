"use strict"

const mongoose = require("mongoose"),
    Schemas = mongoose.Schema;

const SchemaResponse = Schemas({
    nombre:String,
    correo:String,
    password:String,
    token:String,
    fecha:{type:Date, default: new Date().toISOString()}
});

module.exports = mongoose.model("datosUsuarios", SchemaResponse, "datosUsuarios");
