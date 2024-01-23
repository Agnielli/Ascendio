const nodemailer = require("nodemailer");
const connection = require("../config/db");
require("dotenv").config(); // por si acaso no sabemos aun

async function mailer(email, nickname, message) {
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
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #1D1D1B;">

  <div style="text-align: center; background-color: #e15252; padding: 10px; color: #fff;">
    <p style="margin: 0;">¡Bienvenido a Ascendio!</p>
  </div>

  <h2 style="margin: 20px; color: #fff;">Hola, ${nickname && nickname.charAt(0).toUpperCase() + nickname.slice(1)}</h2>

  <p style="margin: 20px; color: #fff;">Gracias por completar tu registro en Ascendio.</p>

  <p style="margin: 20px; color: #fff;">Para activar tu cuenta, pulsa el siguiente botón:</p>

  <button style="display: inline-block; margin: 0 20px 20px 20px; padding: 8px 35px; background-color: #e15252; color: #2e2d2d; font-weight: bold; text-decoration: none; border: none; border-radius: 35px; cursor: pointer;">
  <a href="${message}" style="text-decoration: none; color: inherit; display: block; width: 100%; height: 100%;">ACTIVAR</a>
</button>
</div> `, // html body
    });

    console.log("Message sent: %s", info.messageId);
  }
}

module.exports = mailer;
//cristian.mlg.94@hotmail.com
