import Dia from '../models/Dia.js'

class DiaController {

    salvar = function (req, res) {
        let sabado = 0
        if(req.body.dia === 5){
            sabado = 1
        }

        const novo = {
            data: req.body.data,
            dia: req.body.dia,
            sabado: sabado,
            calendario_id: req.body.calendario_id
        }

        Dia.create(novo).then(function (data) {
            req.flash('success_msg', 'Dia letivo criado com sucesso!')
            res.redirect('/calendario');
        })
    }

    excluir = function (req, res) {
        let id = req.params.id
        Dia.destroy({
            where:{
                id: id
            }
        }).then(function () {
            req.flash('success_msg', 'Dia excluído com sucesso!')
            res.redirect('/calendario');
        })
    }

}

export default new DiaController()