const nodemailer = require("nodemailer");
const connection = require("../config/db");
require("dotenv").config(); // por si acaso no sabemos aun

async function mailer(email, message) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NM_USER, // lo está mirando juanjo
      pass: process.env.NM_PASS, // VERIFIACION EN DOS PASOS Y LUEGO CONTRASEÑA DE aplicación
    },
  });

  if (email) {
    const info = await transporter.sendMail({
      from: `"Ascendio" <${process.env.NM_USER}>`, // sender address
      to: email, // list of receivers
      subject: "Bienvenido a Ascendio", // Subject line
      // text: "Hola algo bonito", // plain text body
      html: `<p>Hola,</p><p>Este es un correo de ejemplo con un <a href=${message}>enlace</a></p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
  }
}

module.exports = mailer;
//cristian.mlg.94@hotmail.com
