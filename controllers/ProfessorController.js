import Professor from "../models/Professor.js";
import Usuario from "../models/Usuario.js";
import professor from "../models/Professor.js";

class ProfessorController {
    index = async function (req, res) {
        Professor.findAll({
            include:{
                model: Usuario,
                as: 'usuario'
            }
        }).then(function (professores) {
            res.render('professor/index', {professores: professores})
        })
    }

    salvar = async function (req, res)  {
        var novo = {
            siape: req.body.siape,
            nome: req.body.nome,
            email: req.body.email,
            status: 1
        }

        Professor.create(novo).then(function (professor) {

            var usuario = {
                username: professor.siape,
                categoria: 1,
                status: 0,
                professor_id: professor.id
            }

            Usuario.create(usuario).then(function (usuario) {
                req.flash('success_msg', 'Professor cadastrado com sucesso!')
                res.redirect('/professor')
            })


        })



    }

    ativar = function (req, res) {

        var id = req.params.id
        Professor.update({
            status: 1
        }, {
            where:{id: id}
        }).then(function (professor) {
            req.flash('success_msg', 'Professor ativado com sucesso!')
            res.redirect('/professor')
        })

    }

    desativar = function (req, res) {

        var id = req.params.id
        Professor.update({
            status: 0
        }, {
            where:{id: id}
        }).then(function (professor) {
            req.flash('success_msg', 'Professor desativado com sucesso!')
            res.redirect('/professor')
        })

    }

}

export default new ProfessorController()