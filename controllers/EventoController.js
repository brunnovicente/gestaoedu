import Aluno from '../models/Aluno.js'
import Modalidade from "../models/Modalidade.js";
import Time from "../models/Time.js";
import Membro from "../models/Membro.js";

class EventoController{

    index = function (req, res){
        res.render('evento/index', {layout: 'branco'})
    }

    cadastro = function (req, res){
        res.render('evento/cadastro', {layout: 'branco'})
    }

    salvar = async function (req, res){
        var aluno = {
            nome: req.body.nome,
            email: req.body.email,
            curso: req.body.curso,
            matricula: req.body.matricula,
        }
        aluno.matricula = aluno.matricula.toUpperCase();

        const discente = await Aluno.findOne({where: {matricula: aluno.matricula}});

        if(discente){
            req.flash('error_msg', 'Aluno já cadastrado!')
            res.redirect('/evento/inscricao/'+discente.id);
        }else{
            Aluno.create(aluno).then(function (aluno){
                req.flash('success_msg', 'Aluno cadastrado com sucesso!')
                res.redirect('/evento/inscricao/'+aluno.id);
            })
        }
    }

    inscricao = async function (req, res){
        const aluno = await Aluno.findOne({
            where:{
                id: req.params.id
            }
        })
        const modalidades = await Modalidade.findAll()
        aluno.coletivas = await Time.findAll({
            where:{aluno_id: aluno.id},
            include:{
                model: Modalidade,
                where:{tipo: 1}
            }
        })
        for(let i = 0; i < aluno.coletivas.length; i++){
            aluno.coletivas[i].membros = await Membro.findAll({
                where:{time_id: aluno.coletivas[i].id},
                include:{
                    model: Aluno
                }
            });
        }

        const membros = await Membro.findAll({
            where:{
                aluno_id: aluno.id
            },
            include:{
                model: Time,
                include:{
                    model: Modalidade
                }
            }
        })
        const individuais = []
        const coletivas = []
        for(let i = 0; i < membros.length; i++){
            if(membros[i].time.modalidade.tipo === 1){
                coletivas.push(membros[i].time)
            }else{
                individuais.push(membros[i].time)
            }
        }

        for(let i = 0; i < individuais.length; i++){
            individuais[i].membros = await Membro.findAll({
                where:{
                    time_id: individuais[i].id
                },
                include:{
                    model: Aluno
                }
            })
        }

        for(let i = 0; i < coletivas.length; i++){
            coletivas[i].membros = await Membro.findAll({
                where:{
                    time_id: coletivas[i].id
                },
                include:{
                    model: Aluno,
                    required: false
                }
            })
        }

        aluno.individuais = individuais
        aluno.coletivas = coletivas
        aluno.total = individuais.length + coletivas.length


        // aluno.individuais = await Time.findAll({
        //     include:{
        //         model: Modalidade,
        //         where:{tipo: 2}
        //     }
        // })
        // for(let i = 0; i < aluno.individuais.length; i++){
        //     aluno.individuais[i].membros = await Membro.findAll({
        //         where:{time_id: aluno.individuais[i].id},
        //         include:{
        //             model: Aluno
        //         }
        //     });
        // }
        res.render('evento/inscricao', {layout: 'branco', aluno: aluno, modalidades: modalidades})
    }

    salvartime = async function (req, res){

            const time = {
                descricao: req.body.descricao,
                modalidade_id: req.body.modalidade_id
            }
            Time.create(time).then(function (time){
                var membro = {
                    aluno_id: req.body.aluno_id,
                    time_id: time.id
                }
                Membro.create(membro).then(function (membro){
                    req.flash('success_msg', 'Modalidade adicionada com sucesso!')
                    res.redirect('/evento/inscricao/'+req.body.aluno_id);
                })
            })

    }//Fim salvartime

    exlcuirtime = function (req, res){
        var aluno_id = req.params.aluno_id
        console.log('===>> ALUNO ID: '+aluno_id)
        Time.findOne({
            where:{
                id: req.params.id
            }
        }).then(async function (time){

            await Membro.destroy({
                where:{
                    time_id: time.id
                }
            })
            await time.destroy()
            req.flash('success_msg', 'Modalidade excluída com sucesso!')
            res.redirect('/evento/inscricao/'+aluno_id);

        })
    }

    salvarmembro = async function (req, res){
        const matricula = req.body.matricula2
        const aluno_id = req.body.aluno_id2

        console.log('>>>>> MATRÍCULA: '+matricula)
        var aluno = await Aluno.findOne({
            where:{
                matricula: matricula
            }
        })
        console.log('>>>>>>>> ALUNO: ')
        console.log(aluno)
        if(!aluno){
            aluno = await Aluno.create({
                nome: req.body.nome2,
                email: req.body.email2,
                curso: req.body.curso2,
                matricula: matricula
            })
        }

        const membro = {
            aluno_id: aluno.id,
            time_id: req.body.time_id,
        }

        Membro.create(membro).then(function (membro){
            req.flash('success_msg','Membro adicionado com sucesso!')
            res.redirect('/evento/inscricao/'+aluno_id)
        })

    }

    //API
    getAluno = async function (req, res){
        const matricula = req.params.matricula
        const aluno = await Aluno.findOne({
            where:{
                matricula: matricula
            }
        })
        if(!aluno){
            return res.status(404).json({mensagem: 'Aluno não encontrado'})
        }

        res.json(aluno);
    }

    verificarColetiva = async function (req, res){
        const matricula = req.params.matricula
        const aluno = await Aluno.findOne({
            where:{
                matricula: matricula
            }
        })
        if(!aluno){
            return res.status(404).json({mensagem: 'Aluno não encontrado'})
        }
        const membros = await Membro.findAll({
            where:{
                aluno_id: aluno.id,
            },
            include:{
                model: Time,
                include:{
                    model: Modalidade,
                }
            }
        })
        var qtd = 0
        for(let i=0;i<membros.length;i++){
            if(membros[i].time.modalidade.tipo === 1){
                qtd++
            }
        }
        const dado = {qtd: qtd}
        console.log('>>>> DADO: '+dado.qtd)
        res.json(dado);
    }

    relatorio = async function (req, res){
        const modalidades = await Modalidade.findAll()
        res.render('evento/relatorio', {modalidades: modalidades})
    }

    lista = async function (req, res){
        const modalidade = await Modalidade.findOne({
            where:{
                id: req.params.id
            }
        })

        const times = await Time.findAll({
            where:{
                modalidade_id: modalidade.id
            },
            include:{
                model: Modalidade,
            }
        })

        for(let i=0;i < times.length;i++){
            times[i].membros = await Membro.findAll({
                where:{
                    time_id: times[i].id
                },
                include:{
                    model: Aluno
                }
            })
        }

        res.render('evento/lista', {modalidade:modalidade, times: times})
    }

    aluno = async function(req, res){
        const alunos = await Aluno.findAll({order: [['nome', 'ASC']]})
        res.render('evento/aluno', {alunos: alunos})
    }

}

export default new EventoController();