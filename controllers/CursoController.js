import Curso from "../models/Curso.js"
import Professor from "../models/Professor.js"

async function index(req, res){
    var cursos = await Curso.findAll({
        include:{
            model: Professor,
            as: 'professor'
        },
        where:{
            status: 1
        }
    })

    var professores = await Professor.findAll()

    res.render('curso/index', {cursos: cursos, professores: professores})
}

async function editar(req, res){
    var id = req.body.id;

    var curso = {
        professor_id: req.body.coordenador2,
        descricao: req.body.descricao2,
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

export default {index, editar};