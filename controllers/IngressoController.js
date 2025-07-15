import qrcode from 'qrcode'

class IngressoController {

    gerar = function (req, res) {

        const timestamp = Date.now().toString(36); // base 36 do timestamp
        const aleatorio = Math.random().toString(36).substr(2, 5); // 5 caracteres aleatórios

        const codigo = `${timestamp}${aleatorio}`.toUpperCase();
        req.flash('success_msg', codigo)
        res.redirect('/principal')

    }

}

export default new IngressoController();