import Professor from "../models/Professor.js";

const eAdmin = function(req, res, next) {
    if(req.isAuthenticated() && req.user.categoria === 1) {
        Professor.findByPk(req.user.professor_id).then(function (professor) {
             req.user.professor = professor;
             //return next()
        })
        return next()
    }
    req.flash('error_msg', 'Você não tem autorização para acessar esse conteúdo')
    res.redirect('/principal')
}

const isLogado = function(req, res, next) {
    if(req.isAuthenticated()) {
        Professor.findByPk(req.user.professor_id).then(function (professor) {
             req.user.eleitor = professor;
        //     return next()
         })
        return next()
    }
    req.flash('error_msg', 'Você não tem autorização para acessar esse conteúdo')
    res.redirect('/usuario/login')
}

export {eAdmin, isLogado}