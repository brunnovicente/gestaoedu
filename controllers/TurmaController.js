import Turma from '../models/Turma.js'
import Curso from "../models/Curso.js";

async function index(req, res) {
    var turmas = await Turma.findAll({
        include:{
            model: Curso,
            required: true,
            where:{
                professor_id: req.user.professor.id
            }
        },
        where:{
            status: 1
        }
    })
    res.render('turma/index', {turmas: turmas})
}

async function cadastrar(req, res) {
    const novo = {
        ano: req.body.ano,
        semestre: req.body.semestre,
        inicio: req.body.inicio,
        fim: req.body.fim,
        status: 1
    }
}

export default {index}