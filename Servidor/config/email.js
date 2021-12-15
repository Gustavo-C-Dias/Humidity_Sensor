const nodemailer = require('nodemailer')

async function main(email, usuario) {

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: true,
    auth: {
      user: 'contatesteparacriar@gmail.com',
      pass: 'criandoasenhadoemail'
    }})

  let info = {
    from: "Fred Foo 👻 <foo@example.com>",
    to: email,
    subject: "Humidity Sensor - Recuperação de Senha",
    text: "Para recuperar sua senha clique aqui" //Ver como gerar o link de criar senha
  }
  
  transporter.sendMailer(mailOptions, (err, info) => {
      if(err) {
          return console.log(err)
      }
      console.log(info)
  })
}