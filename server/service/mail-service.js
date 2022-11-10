const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporer = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        })
    }
    async sendActivationMail(to, link) {
        await this.transporer.sendMail({
            form: process.env.SMTP_USER,
            to: to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">Подтвердить почту</a>
                </div>
                `
        })
    }
}

module.exports = new MailService()