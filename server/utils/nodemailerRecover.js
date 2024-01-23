const nodemailer = require("nodemailer");
const connection = require("../config/db");
require("dotenv").config(); // por si acaso no sabemos aun

async function recoverMailer(email, nickname, message) {
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
      subject: "Solicitud cambio de contraseña", // Subject line
      // text: "Hola algo bonito", // plain text body
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #1D1D1B;">

    <div style="text-align: center; background-color: #e15252; padding: 10px; color: #fff;">
      <p style="margin: 0;">Recuperación de Contraseña</p>
    </div>

    <h2 style="margin: 20px; color: #fff;">Hola, ${nickname && nickname.charAt(0).toUpperCase() + nickname.slice(1)}</h2>

    <p style="margin: 20px; color: #fff;">Has solicitado un cambio de contraseña en Ascendio.</p>

    <p style="margin: 20px; color: #fff;">Para completar el proceso, haz clic en el siguiente enlace:</p>

    <a href="${message}" style="display: inline-block; margin: 0 20px 20px 20px; padding: 8px 35px; background-color: #e15252; color: #2e2d2d; font-weight: bold; text-decoration: none; border: none; border-radius: 35px; cursor: pointer;">CAMBIAR CONTRASEÑA</a>

  </div>
      
      `, // html body
    });

    // console.log("Message sent: %s", info.messageId);
  }
}

module.exports = recoverMailer;