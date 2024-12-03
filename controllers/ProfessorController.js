import Professor from "../models/Professor.js";
import Usuario from "../models/Usuario.js";

export default {
    index: function (req, res) {
        Professor.findAll({
            include:{
                model: Usuario,
                as: 'usuario'
            }
        }).then(function (professores) {
            res.render('professor/index', {professores: professores})
        })
    }
}