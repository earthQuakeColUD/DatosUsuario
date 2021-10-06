"use strict";
const nodemailer = require("nodemailer");
const configSMTP = require("../config/dataConfig");

async function sendEmail(infoFrom,infoTo) {
    var infoFromSplit = infoFrom.split("/");
    var infoToSplit = infoTo.split("/");
    // crea el protocolo para el envio de correo utilizando un correo origen
    let transporter = nodemailer.createTransport({
        host: configSMTP.hostCorreoSMTP,
        port: configSMTP.portcorreoSMTP,
        secure: true,
        auth: {
            user: infoFromSplit[0], // correo origen
            pass: infoFromSplit[1], // contraseña de aplicacion de origen
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: infoFromSplit[0], // sender address
        to: infoToSplit[0], // list of receivers
        subject: "Contraseña APP EarthQuaker", // Subject line
        html: `<b>Esperamos tengas un buen día.</b>
        <b>tu contraseña en la app es:</b>
        <b>${infoToSplit[1]}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
module.exports = {sendEmail}