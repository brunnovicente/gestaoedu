import Curso from "../models/Curso.js"
import Professor from "../models/Professor.js"

class CursoController {

    index = async function (req, res) {
        var cursos = await Curso.findAll({
            include:{
                model: Professor,
                as: 'professor'
            },
            where:{
                status: 1
            }
        })

        var professores = await Professor.findAll({where: {status: 1}})

        res.render('curso/index', {cursos: cursos, professores: professores})
    }

    salvar = async function(req, res){
        var curso = {
            descricao: req.body.descricao,
            sigla: req.body.sigla,
            professor_id: req.body.coordenador,
            status: 1
        }

        Curso.create(curso).then(function(curso){
            req.flash('success_msg', 'Curso criado com sucesso!')
            res.redirect('/curso')
        })
    }

    editar = async function (req, res) {
        var id = req.body.id;

        var curso = {
            professor_id: req.body.coordenador2,
            descricao: req.body.descricao2,
            sigla: req.body.sigla2,
        }

        Curso.update(curso, {
            where: {
                id: id,
            }
        }).then(function(){
            req.flash('success_msg', 'Curso atualizado com sucesso!')
            res.redirect('/curso')
        })
    }

}

export default new CursoController()