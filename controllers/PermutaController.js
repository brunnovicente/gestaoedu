import Diario from "../models/Diario.js";
import Professor from "../models/Professor.js";
import Turma from "../models/Turma.js";
import Curso from "../models/Curso.js";
import Permuta from "../models/Permuta.js";
import tranporter from "../config/email.js"


async function enviarEmailTeste(){
    const config = {
        from: 'coordenacao@batcaverna.online',
        to: 'brunovicente.lima@ifma.edu.br',
        subject: 'Teste de Registro',
        html: '<h3>Deu Certo</h3>'
    }
    tranporter.sendMail(config).then(function(){
        console.log('Email enviado com sucesso!')
    })
}

function definirDia(data){
    const daysOfWeek = [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
        'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];

    // Converte a string em um objeto Date
    const date = new Date(data);

    // Verifica se a data é válida
    if (isNaN(date)) {
        return 'Data inválida';
    }

    // Retorna o dia correspondente
    return daysOfWeek[date.getDay()+1];
}

function enviarEmailProfessor(permuta){
    const config = {
        from: 'coordenacao@batcaverna.online',
        to: permuta.substituto.professore.email,
        subject: 'Nova Aula Registrada',
        html:
         '<strong>CURSO</strong>'+permuta.diario.turma.curso.descricao+'<br>'+
            '<strong>TURMA</strong>'+permuta.diario.turma.descricao+'<br>'+
            '<strong>SEMESTRE</strong>'+permuta.diario.turma.ano+'.'+permuta.diario.turma.semestre+'<br>'+
            '<strong>DIARIO: </strong>'+permuta.diario.descricao+'<br>'+
            '<strong>DATA: </strong> '+permuta.data+'<br>'+
            '<strong>DIA: </strong>'+permuta.dia+'<br>'+
            '<strong>HORÁRIOS: </strong>'+permuta.horarios
    }
    const Mail = tranporter.sendMail(config)
}

export default {
    salvar: function (req, res){
        const permuta = {
            data: req.body.data,
            horarios: req.body.horarios,
            justificativa: req.body.justificativa,
            status: 0,
            diario_id: req.body.id_diario,
            dia: definirDia(req.body.data),
            substituto_id: req.body.substituto,
        }
        Permuta.create(permuta).then(async function (permuta) {
            var substituto = await Diario.findByPk(permuta.substituto_id, {
                include:{
                    model: Professor
                }
            })
            var diario = await Diario.findByPk(permuta.diario_id, {
                include:{
                    model: Turma,
                    include:{
                        model: Curso
                    }
                }
            })
            permuta.substituto = substituto
            permuta.diario = diario
            enviarEmailProfessor(permuta)
            req.flash('success_msg', 'Permuta registrada com sucesso')
            res.redirect('/permuta/listar');
        })

        //Falta criar a construção da solicitação

    },
    index: function(req, res){
        Permuta.findAll({
            include:{
                model: Diario
            }
        }).then(function(permutas){
            res.render('permuta/index', {permutas: permutas})
        })
    },
    cadastrar: function (req, res){
        Diario.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {
                    model: Professor,
                },
                {
                    model: Turma,
                    include:{
                        model: Curso
                    }
                }
            ]
        }).then(function (diario){
            Diario.findAll({
                where:{
                    turma_id: diario.turma_id
                },
                include:{
                    model: Professor,

                }
            }).then(function (substitutos){

                res.render('permuta/cadastrar', {diario: diario, substitutos: substitutos});
            })

        })

    },

    listar: function (req, res){
        Professor.findOne({
            where: {
                siape: req.body.busca
            }
        }).then((professor) => {
            Diario.findAll({
                 where: {professor_id: professor.id},
                 include:{
                     model: Turma,
                     include: Curso
                 }
             }).then((diarios) => {
                 res.render('permuta/listar', {layout: 'secundario', professor: professor, diarios: diarios});
             })
        })
    },
    minhas: function (req, res){
        var id = req.params.id;
        Professor.findByPk(id).then(professor => {

            Permuta.findAll({
                include: [
                    {
                        model: Diario,
                        alias: 'diario',
                        where: {
                            professor_id: id
                        }
                    },
                    {
                        model: Diario,
                        alias: 'substituto',
                        include: {
                            model: Turma,
                            include: Curso
                        }
                    }
                ]
            }).then(function (permutas) {

                res.render('permuta/minhas', {permutas: permutas, professor: professor});


            })
        })
    }
}//Fim do Controller