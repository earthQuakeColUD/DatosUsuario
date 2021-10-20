"use stirct"

const SchemaDB = require("../modelosDatos/datosUsuarios");

//Guardar cuenta nueva
async function saveDB(req) {
    try {
        var data = new SchemaDB();
        data.nombre = req.nombre
        data.correo = req.correo
        data.password = req.password
        data.token = req.token
        const save = await data.save((err, res) => { })
    }
    catch (e) {
        console.log("error catch guardar: " + e)
    }
};

//encontrar cuenta 
async function findAccount(req) {
    var filter = {
        "correo": req.correo
    }
    var response = await SchemaDB.find(filter, (err, resDB) => {
        console.log("respuesta busqueda cuenta: " + err + resDB)
    });
    return response;
}
// actualizar cuenta
async function updateAccount(req) {
    var filter = {
        "correo": req.correo
    }
    var update = {
        "token": req.token
    }
    var response;
    await SchemaDB.findOneAndUpdate(filter, { $set: update }, { new: true }, (err, resDB) => {
        if (err) {
            response = "fallido";
        }
        response = "exitoso";
    });
    return response;
}


//obtener todos los  usuairos con token
async function findAllAccounts() {
    var response = await SchemaDB.find({}, (err, resDB) => {
        console.log("respuesta busqueda cuenta: " + err + resDB)
    });
    return response;
}

//elimina la informacion de la DB
function DeleteAll() {
    if (database.connect()) {
        SchemaDB.deleteMany({}, (err, res) => {
            if (err) {
                console.log("error ", err)
                database.disconectDB();
            }
            if (res) {
                database.disconectDB();
            }
        });
    }
};

module.exports = { saveDB, findAccount, updateAccount, findAllAccounts };