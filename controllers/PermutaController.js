import Diario from "../models/Diario.js";
import Professor from "../models/Professor.js";
import Turma from "../models/Turma.js";
import Curso from "../models/Curso.js";

export default {
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
            res.render('permuta/cadastrar', {diario: diario});
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
    }
}//Fim do Controller