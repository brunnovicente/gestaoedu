import Professor from "../models/Professor.js";
import Calendario from "../models/Calendario.js";
import Permuta from "../models/Permuta.js";

class PrincipalController {

    index = async function(req, res) {

        const pendentes = (await Permuta.findAll({
            where: {
                status: 0
            }
        })).length

        const abertas = (await Permuta.findAll({
            where:{
                status: 1
            }
        })).length

        res.render('principal/index', {pendentes: pendentes, abertas: abertas});
    }

}

export default new PrincipalController()