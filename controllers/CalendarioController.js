import Calendario from "../models/Calendario.js";
import Dia from "../models/Dia.js";
import cal from '../config/Calendario.js'

class CalendarioController {

    gerar = async function (req, res) {

        let id = req.params.id;
        const calendario = await Calendario.findByPk(id);

        const datas = cal.gerarDatas(calendario.inicio, calendario.fim)

        datas.forEach(async function (data){
            var tipo = 1;
            if(data.diaSemana === 'Domingo' || data.diaSemana === 'Sábado'){
                tipo = 0
            }
            let dia = {
                data: data.data,
                dia: data.diaSemana,
                tipo: tipo,
                calendario_id: calendario.id
            }
            await Dia.create(dia)
        })

        req.flash('success_msg', 'Datas geradas com sucesso!')
        res.redirect('/')

    }//Fim do Gerar

    detalhar = async function (req, res) {

        let id = req.params.id;
        const calendario = await Calendario.findByPk(id);

        const dias = await Dia.findAll({
            where: {
                calendario_id: calendario.id
            },
            order:[['data', 'ASC']]
        })

        res.render('calendario/detalhar', {calendario: calendario, dias: dias})

    }
}

export default new CalendarioController();