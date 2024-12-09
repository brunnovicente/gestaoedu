import Diario from "../models/Diario.js";
import Professor from "../models/Professor.js";
import Turma from "../models/Turma.js";
import Curso from "../models/Curso.js";
import Permuta from "../models/Permuta.js";
import tranporter from "../config/email.js"
import auxiliar from "../helpers/auxiliar.js"
import Usuario from "../models/Usuario.js";
import permuta from "../models/Permuta.js";

function definirDia(data){
    const daysOfWeek = [
        'Segunda-feira', 'Terça-feira', 'Quarta-feira',
        'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'
    ];

    // Converte a string em um objeto Date
    const date = new Date(data);

    // Verifica se a data é válida
    if (isNaN(date)) {
        return  'Data inválida';
    }
    console.log('numero data: '+date.getDay())
    console.log('DIA: '+daysOfWeek[date.getDay()])

    // Retorna o dia correspondente
    return daysOfWeek[date.getDay()];
}

function definirNumeroDia(data){
    const daysOfWeek = [
        '2', '3', '4',
        '5', '6', '7', '8'
    ];

    // Converte a string em um objeto Date
    const date = new Date(data);

    // Verifica se a data é válida
    if (isNaN(date)) {
        return  'Data inválida';
    }

    // Retorna o dia correspondente
    return daysOfWeek[date.getDay()];
}

function formatarData(data){
    const d =  new Date(data)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0') // Mês começa do 0
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
}

function enviarEmailSubstituto(permuta){
    const config = {
        from: 'coordenacao@batcaverna.online',
        to: permuta.substituto.professor.email,
        subject: 'Nova Aula - '+formatarData(permuta.data),
        html:`<h2>NOVA AULA ATRIBUIDA A VOCÊ</h2>
                <table style="border-collapse: collapse; text-align: left;">
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px;">CURSO</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.diario.turma.curso.descricao}</td>
                    </tr> 
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px;">TURMA</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.diario.turma.descricao}</td>
                    </tr> 
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px;">SEMESTRE</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.diario.turma.ano}.${permuta.diario.turma.semestre}</td>
                    </tr> 
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px;">DIARIO</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.substituto.descricao}</td>
                    </tr>
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px;">DATA</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${formatarData(permuta.data)}</td>
                    </tr>   
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px;">DIA</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.dia}</td>
                    </tr>   
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px;">HORÁRIOS</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.horarios}</td>
                    </tr>                      
                </table>`

    }
    tranporter.sendMail(config).then(function (mail){
        console.log('Email enviado ao professor substituto')
    })
}

function enviarEmailCoordenador(permuta){
    const config = {
        from: 'coordenacao@batcaverna.online',
        to: permuta.diario.turma.curso.professor.email,
        subject: 'Nova Aula - '+formatarData(permuta.data),
        html:`<h2>Uma Nova Troca/Ausência foi registrada</h2>
                <table style="border-collapse: collapse; text-align: left;">
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">CURSO</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.diario.turma.curso.descricao}</td>
                    </tr>
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">TURMA</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.diario.turma.descricao}</td>
                    </tr>
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">SEMESTRE</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.diario.turma.ano}.${permuta.diario.turma.semestre}</td>
                    </tr>
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">DIÁRIO</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.diario.descricao}</td>
                    </tr>
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">PROFESSOR</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.diario.professor.nome}</td>
                    </tr>
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">DIÁRIO SUBSTITUTO</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.substituto.descricao}</td>
                    </tr>
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">PROFESSOR SUBSTITUTO</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.substituto.professor.nome}</td>
                    </tr>
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">DATA</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${formatarData(permuta.data)}</td>
                    </tr>
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">DIA</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.dia}</td>
                    </tr>
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">HORÁRIOS</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.horarios}</td>
                    </tr>
                    <tr style="border: 1px solid #ddd;">
                        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">JUSTIFICATIVA</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${permuta.justificativa}</td>
                    </tr>
                </table>`
    }
    tranporter.sendMail(config).then(function (mail){
        console.log('Email enviado ao coordenador')
    })
}

function gerarHorario(req){
    var horarios = definirNumeroDia(req.body.data) + req.body.turno+''
    if(req.body.primeiro)
        horarios += req.body.primeiro
    if(req.body.segundo)
        horarios += req.body.segundo
    if(req.body.terceiro)
        horarios += req.body.terceiro
    if(req.body.quarto)
        horarios += req.body.quarto
    if(req.body.quinto)
        horarios += req.body.quinto
    if(req.body.sexto)
        horarios += req.body.sexto
    return horarios
}

export default {
    abrir: function (req, res){
        Permuta.update({
            status: 1
        }, {
            where:{
                id: req.params.id
            }
        }).then(function () {
            req.flash('success_msg', 'Permuta aberta com sucesso!')
            res.redirect('/permuta')
        })
    },
    fechar: function(req,res){
        Permuta.update({
            status: 2
        }, {
            where:{
                id: req.params.id
            }
        }).then(function () {
            req.flash('success_msg', 'Permuta fechada com sucesso!')
            res.redirect('/permuta')
        })
    },

    salvar: function (req, res){
        var horarios = gerarHorario(req)

        const permuta = {
            data: req.body.data,
            horarios: horarios,
            justificativa: req.body.justificativa,
            status: 0,
            diario_id: req.body.id_diario,
            dia: definirDia(req.body.data),
            substituto_id: req.body.substituto === '0' ? null : req.body.substituto,
        }
        Permuta.create(permuta).then(async function (permuta) {

            var diario = await Diario.findByPk(permuta.diario_id, {
                include:[{
                    model: Turma,
                    include:{
                        model: Curso,
                        include:{
                            model: Professor,
                            as: 'professor'
                        }
                    }
                },{
                    model: Professor,
                    as: 'professor'
                }]
            })
            permuta.diario = diario
            if(permuta.substituto_id > 0) {
                var substituto = await Diario.findByPk(permuta.substituto_id, {
                    include: {
                        model: Professor,
                        as: 'professor'
                    }
                })
                permuta.substituto = substituto
            }else{
                permuta.substituto = diario
            }

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
            include:[
                {
                    model: Diario,
                    as: 'diario',
                    include:[
                        {
                            model: Professor,
                            as: 'professor'
                        },
                        {
                            model: Turma,
                            include: Curso,
                        }
                    ]
                },
                {
                    model: Diario,
                    as: 'substituto',
                    include:{
                        model: Professor,
                        as: 'professor'
                    }
                }
            ],
            order:[
                ['data', 'DESC']
            ]
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
                    as: 'professor'
                },
                {
                    model: Turma,
                    as: 'turma',
                    include:{
                        model: Curso,
                        as: 'curso',
                        include:{
                            model: Professor,
                            as: 'professor'
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
                    as: 'professor'
                }
            }).then(function (substitutos){

                res.render('permuta/cadastrar', {diario: diario, substitutos: substitutos, layout: 'secundario'});
            })
        })

    },
    listar: function (req, res){
        Professor.findOne({
            where: {
                siape: req.body.busca
            }
        }).then((professor) => {
            if(!professor){
                console.log('Professor não encontrado')
                req.flash('error_msg', 'SIAPE não encontrado!')
                res.redirect('/permuta/listar')
            }else{
                Diario.findAll({
                    where: {professor_id: professor.id},
                    include:{
                        model: Turma,
                        include: {
                            model: Curso,
                        }
                    }
                }).then((diarios) => {
                    res.render('permuta/listar', {layout: 'secundario', professor: professor, diarios: diarios});
                })
            }
        })
    },
    minhas: function (req, res){
        var id = req.params.id;
        Professor.findByPk(id).then(professor => {
            Permuta.findAll({
                // where:{
                //     status: 0
                // },
                include: [
                    {
                        model: Diario,
                        as: 'diario',
                        include:{
                            model: Professor,
                            as: 'professor'
                        }
                    },
                    {
                        model: Diario,
                        as: 'substituto',
                        include: [{
                            model: Turma,
                            include: Curso,
                            as: 'turma'
                        },{
                            model: Professor,
                            as: 'professor'
                        }],
                        where: {
                            professor_id: id
                        }
                    }
                ]
            }).then(function (permutas) {

                res.render('permuta/minhas', {permutas: permutas, professor: professor});


            })
        })
    },
    delete:function (req, res){
        var id = req.params.id
        Permuta.destroy({
            where:{
                id: id
            }
        }).then(function (){
            req.flash('success_msg', 'Permuta removida com sucesso!')
            res.redirect('/permuta')
        })
    },
}//Fim do Controller