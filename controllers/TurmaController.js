import Turma from '../models/Turma.js'
import Curso from "../models/Curso.js";
import Calendario from "../models/Calendario.js";
import Professor from "../models/Professor.js";

async function index(req, res) {
    var turmas = await Turma.findAll({
        include:[
            {
                model: Curso,
                required: true,
                include:[
                    {
                        model: Professor,
                        as: 'professor',
                        where:{
                            id: req.user.professor.id
                        }
                    }
                ]
            },
            {
                model: Calendario,
            }
        ],
        where:{
            status: 1
        }
    })

    var curso = await Curso.findOne({
        where:{
            professor_id: req.user.professor.id
        }
    })
    var calendarios = await Calendario.findAll({
        where:{
            status: 1
        }
    })

    res.render('turma/index', {turmas: turmas, curso: curso, calendarios: calendarios})
}

async function salvar(req, res) {
    const novo = {
        codigo: req.body.codigo,
        descricao: req.body.descricao,
        curso_id: req.body.curso,
        calendario_id: req.body.calendario,
        status: 1
    }
    Turma.create(novo).then(function (result) {
        req.flash('sucess_msg', 'Turma cadastrada com sucesso')
        res.redirect('/turma')
    })
}

export default {index, salvar}