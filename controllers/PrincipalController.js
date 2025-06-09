import Professor from "../models/Professor.js";
import Calendario from "../models/Calendario.js";

class PrincipalController {

    index = function(req, res) {
        res.render('principal/index');
    }

}

export default new PrincipalController()