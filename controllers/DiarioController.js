import Diario from '../models/Diario.js';
import Turma from '../models/Turma.js'
import Curso from '../models/Curso.js'
import Professor from '../models/Professor.js';

async function index(req, res){
    var diarios = await Diario.findAll({
        include:[
            {
                model: Professor,
                as: 'professor',
            },{
                model: Turma,
                required: true,
                include:{
                    model: Curso,
                    where:{
                        professor_id: req.user.professor.id
                    },
                }
            }
        ]
    });
    res.render('diario/index', {diarios: diarios})
}

async function cadastrar(req, res){
    var turmas = await Turma.findAll({
        include:{
            model: Curso,
            required: true,
            where:{
                professor_id: req.user.professor.id
            }
        }
    })
    var professores = await Professor.findAll()
    res.render('diario/cadastrar', {turmas: turmas, professores: professores})
}

async function salvar(req, res){

    var diario = {
        codigo: req.body.codigo,
        descricao: req.body.descricao,
        horario: req.body.horario,
        status: 1,
        total: req.body.total,
        ministrada: 0,
        professor_id: req.body.professor_id,
        turma_id: req.body.turma_id,
    }

    Diario.create(diario).then(function (){
        req.flash('success_msg', 'Diário criado com sucesso.')
        res.redirect('/diario')
    })
}//Fim do Salvar

async function editar(req, res){
    var turmas = await Turma.findAll({
        include:
            {
                model: Curso,
                required: true,
                where:{
                    professor_id: req.user.professor.id
                }
            },
    })
    var professores = await Professor.findAll()
    var diario = await Diario.findOne({where:{id: req.params.id},
        include:[
            {
                model: Professor,
                as: 'professor'
            },
            {
                model: Turma,
            }
        ]
    });
    res.render('diario/editar', {diario:diario, turmas:turmas, professores: professores})
}

function modificar(req, res){
    var diario = {
        codigo: req.body.codigo,
        descricao: req.body.descricao,
        horario: req.body.horario,
        professor_id: req.body.professor_id,
        turma_id: req.body.turma_id,
    }

    Diario.update(diario, {
        where:{id: req.body.id},
    }).then(function (){
        req.flash('success_msg', 'Diário editado com sucesso.')
        res.redirect('/diario')
    })

}

export default {index, cadastrar, salvar, editar, modificar}