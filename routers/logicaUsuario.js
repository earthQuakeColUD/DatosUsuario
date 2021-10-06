"use strict"

const baseDatos = require("../conecciones/baseDatos");
const sendemail = require("./sendEmail");

async function crearUsuari(req) {
    var result;
    var respuesta = await baseDatos.findAccount(req);
    if (respuesta.length > 0) {
        result = { respuesta: "fallo la creación, usuario existente" };
    }
    else {
        if (req.password === req.confirmarPassword) {
            baseDatos.saveDB(req)
            result = { respuesta: "usuario creado" };
        }
        else {
            result = { respuesta: "fallo la creación, no coincide la contraseña" };
        }
    }
    console.log(result)
    return result;
}

async function modificar(req) {
    if (req.correo != undefined && req.correo != "" && req.token != undefined && req.token != "") {
        var response = await baseDatos.updateAccount(req)
    }
    else {
        response = "fallido correo o token vacio";
    }
    return ({result : response})
}

async function validarCuenta(req) {
    var respuesta = await baseDatos.findAccount(req);
    console.log(respuesta);

    if (respuesta != undefined && respuesta.length > 0 && respuesta[0].password === req.password) {
        return ({
            respuesta: "usuario ok",
            boolean: true
        })
    }
    else {
        return ({
            respuesta: "usuario nok",
            boolean: false
        })
    }
}

async function recuperar(req) {
    var respuesta = await baseDatos.findAccount(req);
    if (respuesta != undefined && respuesta.length > 0) {
        var datosOrigen = `${req.app}`;
        var datosDestino = `${req.correo}/${respuesta[0].password}`;
        sendemail.sendEmail(datosOrigen, datosDestino)
        return ({
            respuesta: "se ha enviado su contraseña por correo",
            boolean: true
        })
    }
    else {
        return ({
            respuesta: "fallo recuperacion, el usuario no existe",
            boolean: false
        })
    }
}


async function usuariosTodos() {
    var respuesta = await baseDatos.findAllAccounts();
    console.log(respuesta);
    if (respuesta != undefined && respuesta.length > 0) {
        return ({
            usuarios: respuesta,
            boolean: true
        })
    }
    else {
        return ({
            usuarios: "no existen",
            boolean: false
        })
    }
}

module.exports = { crearUsuari, validarCuenta, recuperar, modificar, usuariosTodos }

