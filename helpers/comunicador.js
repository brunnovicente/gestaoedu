import tranporter from "../config/email.js"

class Comunicador {

    enviarCodigo = function (usuario) {
        const config = {
            from: 'batcaverna@batcaverna.online',
            to: usuario.professor.email,
            subject: 'BatCaverna - Código de Acesso',
            html: `S eu Código de acesso ao GestaoEdu (BatCaverna) é: ${usuario.codigo}`,

        }
        tranporter.sendMail(config).then(function (mail) {
            console.log('Código enviado para o E-mail')
        })
    }

    enviarConfirmacaoAbrir = function (texto, permuta) {
        const config = {
            from: 'batcaverna@batcaverna.online',
            to: permuta.substituto.professor.email,
            subject: 'BatCaverna: Aulas abertas',
            html: `
            As seguintes aulas foram liberadas no SUAP:
            <div>
                DIÁRIO: ${permuta.substituto.descricao}
                DATA: ${permuta.data}
                DIA: ${permuta.dia}
                HORÁRIO: ${permuta.horarios}            
            </div>
        `,

        }
        tranporter.sendMail(config).then(function (mail) {
            console.log('Código enviado para o E-mail')
        })
    }
}

export default new Comunicador()