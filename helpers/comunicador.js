import tranporter from "../config/email.js"

function enviarCodigo(usuario){
    const config = {
        from: 'batcaverna@batcaverna.online',
        to: usuario.professor.email,
        subject: 'BatCaverna - Código de Acesso',
        html:`S eu Código de acesso ao GestaoEdu (BatCaverna) é: ${usuario.codigo}`,

    }
    tranporter.sendMail(config).then(function (mail){
        console.log('Código enviado para o E-mail')
    })
}

export default {enviarCodigo}