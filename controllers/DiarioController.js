import Diario from '../models/Diario.js';
import Turma from '../models/Turma.js'
import Curso from '../models/Curso.js'
import Calendario from "../models/Calendario.js"
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
                    include:[
                        {
                            model: Curso,
                            where:{
                                professor_id: req.user.professor.id
                            },
                        },
                        {
                            model: Calendario
                        }
                    ]
                }
            ]
        });

        var turmas = await Turma.findAll({
            include:{
                model: Curso,
                required: true,
                where:{
                    status: 1
                }
            }
        })

        var professores = await Professor.findAll({where: {status: 1}});

        res.render('diario/index', {diarios: diarios, turmas: turmas, professores: professores});
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
            eixo: req.body.eixo,
            aulas: req.body.aulas,
            dias: req.body.dias,
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

    editarprofessor = async function(req, res){

        var diario = await Diario.findOne({where:{id: req.body.id},})

        var dados = {
            id: req.body.id,
            professor_id: req.body.professor_id,
            aulas: req.body.aulas
        }
        //diario.professor_id = req.body.professor_id
        //diario.aulas = req.body.aulas

        var calendario_id = req.body.calendario_id

        Diario.update(dados, {
            where:{
                id: req.body.id
            }
        }).then(function(){
            req.flash('sucess_msg', 'Alterações salvas com sucesso!')
            res.redirect('/calendario/demanda/'+calendario_id+'/'+diario.turma_id)
        })



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