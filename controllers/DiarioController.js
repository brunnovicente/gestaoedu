import Diario from '../models/Diario.js';
import Turma from '../models/Turma.js'
import Curso from '../models/Curso.js'
import Horario from '../models/Horario.js'
import Professor from '../models/Professor.js';
import auxiliar  from "../helpers/auxiliar.js";

class DiarioController {

    index = async function(req, res){
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

    cadastrar = async function(req, res){
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

    salvar = async function(req, res){

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

    editar = async function(req, res){
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

    modificar = function (req, res){
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

}//Fim do Controller

export default new DiarioController()