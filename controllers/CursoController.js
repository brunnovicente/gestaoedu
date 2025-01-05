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
    res.render('curso/index', {cursos: cursos})
}

export default {index};