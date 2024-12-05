import Professor from "../models/Professor.js";

export default {

    index: function (req, res){
        //Professor.findByPk(req.user.professor_id).then(professor => {
            res.render('principal/index');
        //})
    }

}//Fim do módulo