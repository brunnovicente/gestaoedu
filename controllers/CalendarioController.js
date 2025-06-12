import Calendario from "../models/Calendario.js";
import Turma from "../models/Turma.js";
import Curso from "../models/Curso.js";
import Dia from "../models/Dia.js";
import cal from '../config/Calendario.js'
import Diario from "../models/Diario.js"
import Professor from "../models/Professor.js"
import Sequelize from 'sequelize'
const { fn, col, literal } = Sequelize;

class CalendarioController {

    index = async function(req, res){
        let calendarios = await Calendario.findAll({
            order:[['status','desc']]
        })
        res.render('calendario/index', {calendarios: calendarios})
    }//Fim do index


    gerenciar = async function(req, res){
        let calendario = await Calendario.findOne({
            where:{
                id: req.params.id
            }
        })

        let dias = await Dia.findAll({
            where:{
                calendario_id: calendario.id
            },
            order:[
                ['data', 'ASC']
            ]
        })
        res.render('calendario/gerenciar', {calendario: calendario, dias: dias})

    }//Fim do index

    cadastrar = function (req, res){
        res.render('calendario/cadastrar')
    }

    salvar = async function (req, res) {

        const novo = {
            descricao: req.body.descricao,
            ano: req.body.ano,
            semestre: req.body.semestre,
            inicio: req.body.inicio,
            fim: req.body.fim,
            status: 1
        }

        Calendario.create(novo).then(async function (calendario){
            let datas = await cal.gerarDatas(calendario.inicio, calendario.fim)

            datas.forEach(async function (data){
                if(data.dia < 5){
                    let dia = {
                        data: data.data,
                        dia: data.dia,
                        sabado: 0,
                        calendario_id: calendario.id
                    }
                    await Dia.create(dia)
                }
            })

            req.flash('success_msg', 'Calendário criado com sucesso!')
            res.redirect('/calendario');
        })


        ///Antigo
        // let id = req.params.id;
        // const calendario = await Calendario.findByPk(id);



    }//Fim do Gerar

    demanda = async function(req, res) {
        var calendario = await Calendario.findOne({
            where:{
                id: req.params.id
            }
        })

        var professores = await Professor.findAll()
        for(let i = 0; i < professores.length; i++){

            const aulas = await Diario.findOne({
                attributes: [
                    [fn('SUM', col('aulas')), 'total']
                ],
                where: {
                    professor_id: professores[i].id
                },
                raw: true
            });
            professores[i].aulas = aulas.total
        }
        professores = professores.filter(prof => !!prof.aulas)
        professores.sort((a, b) => b.aulas - a.aulas)

        var turmas = await Turma.findAll({
            include:{
                model: Curso
            },
            where:{
                calendario_id: calendario.id
            },
        })

        for(let i = 0; i < turmas.length; i++){
            turmas[i].diarios = await Diario.findAll({
                where:{
                    turma_id: turmas[i].id
                },
                include:{
                    model: Professor,
                    as: 'professor'
                }
            })
        }

        res.render('calendario/demanda', {calendario: calendario, turmas: turmas, professores: professores});
    }



}

export default new CalendarioController();