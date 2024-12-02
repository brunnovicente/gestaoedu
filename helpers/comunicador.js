import tranporter from "../config/email.js"

function enviarCodigo(usuario){
    const config = {
        from: 'coordenacao@batcaverna.online',
        to: usuario.professor.email,
        subject: 'GestaoEdu - Código de Acesso',
        html:`Seu Código de acesso ao GestaoEdu é: ${usuario.codigo}`,

    }
    tranporter.sendMail(config).then(function (mail){
        console.log('Email enviado ao professor substituto')
    })
}