import Diario from "../models/Diario.js";
import Professor from "../models/Professor.js";
import Turma from "../models/Turma.js";
import Curso from "../models/Curso.js";
import Permuta from "../models/Permuta.js";
import tranporter from "../config/email.js"


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

function formatarData(data){
    const d =  new Date(data)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0') // Mês começa do 0
    const year = d.getFullYear()
    // const hours = String(d.getHours()).padStart(2, '0')
    // const minutes = String(d.getMinutes()).padStart(2, '0')
    // const seconds = String(d.getSeconds()).padStart(2, '0')
    //return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    return `${day}/${month}/${year}`
}

function enviarEmailSubstituto(permuta){
    const config = {
        from: 'coordenacao@batcaverna.online',
        to: permuta.substituto.professore.email,
        subject: 'Nova Aula - '+formatarData(permuta.data),
        html:
        '<h2>Nova aula foi atribuída a você:</h2>'+
         '<strong>CURSO: </strong>'+permuta.diario.turma.curso.descricao+'<br>'+
            '<strong>TURMA: </strong>'+permuta.diario.turma.descricao+'<br>'+
            '<strong>SEMESTRE: </strong>'+permuta.diario.turma.ano+'.'+permuta.diario.turma.semestre+'<br>'+
            '<strong>DIARIO: </strong>'+permuta.substituto.descricao+'<br>'+
            '<strong>DATA: </strong> '+formatarData(permuta.data)+'<br>'+
            '<strong>DIA: </strong>'+permuta.dia+'<br>'+
            '<strong>HORÁRIOS: </strong>'+permuta.horarios
    }
    tranporter.sendMail(config).then(function (mail){
        console.log('Email enviado ao professor substituto')
    })
}

function enviarEmailCoordenador(permuta){
    console.dir(permuta.diario.turma.curso)
    const config = {
        from: 'coordenacao@batcaverna.online',
        to: permuta.diario.turma.curso.professore.email,
        subject: 'Nova Aula - '+formatarData(permuta.data),
        html:
            '<h2>Uma Nova Troca/Ausência foi registrada</h2>'+
            '<strong>CURSO: </strong>'+permuta.diario.turma.curso.descricao+'<br>'+
            '<strong>TURMA: </strong>'+permuta.diario.turma.descricao+'<br>'+
            '<strong>SEMESTRE: </strong>'+permuta.diario.turma.ano+'.'+permuta.diario.turma.semestre+'<br>'+
            '<strong>DIARIO: </strong>'+permuta.diario.descricao+'<br>'+
            '<strong>DIARIO SUBSTITUTO: </strong>'+permuta.substituto.descricao+'<br>'+
            '<strong>PROFESSOR SUBTITUTO: </strong>'+permuta.substituto.professore.nome+'<br>'+
            '<strong>DATA: </strong> '+formatarData(permuta.data)+'<br>'+
            '<strong>DIA: </strong>'+permuta.dia+'<br>'+
            '<strong>HORÁRIOS: </strong>'+permuta.horarios
    }
    tranporter.sendMail(config).then(function (mail){
        console.log('Email enviado ao coordenador')
    })
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
            substituto_id: req.body.substituto || null,
        }
        Permuta.create(permuta).then(async function (permuta) {
            if(permuta.substituto_id) {
                var substituto = await Diario.findByPk(permuta.substituto_id, {
                    include: {
                        model: Professor
                    }
                })
                permuta.substituto = substituto
            }
            var diario = await Diario.findByPk(permuta.diario_id, {
                include:{
                    model: Turma,
                    include:{
                        model: Curso,
                        include:{
                            model: Professor,
                        }
                    }
                }
            })
            permuta.diario = diario

            if(permuta.substituto_id)
                await enviarEmailSubstituto(permuta)
            await enviarEmailCoordenador(permuta)
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
                        model: Curso,
                        include:{
                            model: Professor
                        }
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