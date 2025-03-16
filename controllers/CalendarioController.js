import Calendario from "../models/Calendario.js";
import Dia from "../models/Dia.js";
import cal from '../config/Calendario.js'

class CalendarioController {

    index = async function(req, res){
        let calendario = await Calendario.findOne({
            where:{
                status: 1
            }
        })

        if(!calendario){
            req.flash('error_msg', 'Não existem calendários cadastrado!')
            res.render('calendario/index')
        }else{
            let dias = await Dia.findAll({
                where:{
                    calendario_id: calendario.id
                },
                order:[
                    ['data', 'ASC']
                ]
            })
            res.render('calendario/index', {calendario: calendario, dias: dias})
        }
    }//Fim do index

    cadastrar = function (req, res){
        res.render('calendario/cadastrar')
    }

    salvar = async function (req, res) {

        const novo = {
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




}

export default new CalendarioController();