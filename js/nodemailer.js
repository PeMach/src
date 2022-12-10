const nodemailer = require("nodemailer");



let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: "comparthists2022@outlook.com",
        pass: "compart2022h!"
    },
    tls: {
        rejectUnauthorized: false
    }
})

transporter.sendMail({
    from: "Compartilhando Histórias <comparthists2022@outlook.com>",
    to: "loluserop@gmail.com",
    subject: "Nova senha",
    text: "TEXTO DO EMAIL"
}).then(message => {
    console.log(message);
}).catch(err => {
    console.log(err);
})
    