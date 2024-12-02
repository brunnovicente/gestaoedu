import Professor from "../models/Professor.js";

const discente = function (req, res, next){
    //Categoria 0
}

const docente = function (req, res, next){
    //Categoria 1
}

const coordenador = function(req, res, next) {
    if(req.isAuthenticated() && req.user.categoria === 2) {
        // Professor.findByPk(req.user.professor_id).then(function (professor) {
        //      req.user.professor = professor;
        //      //return next()
        // })
        return next()
    }
    req.flash('error_msg', 'Você não tem autorização para acessar esse conteúdo')
    res.redirect('/principal')
}

const de = function (req, res, next){
    if(req.isAuthenticated() && req.user.categoria === 3) {
        // Professor.findByPk(req.user.professor_id).then(function (professor) {
        //     req.user.professor = professor;
        //     //return next()
        // })
        return next()
    }
    req.flash('error_msg', 'Você não tem autorização para acessar esse conteúdo')
    res.redirect('/principal')
}

const supremo = function (req, res, next){
    if(req.isAuthenticated() && req.user.categoria === 4) {
        // Professor.findByPk(req.user.professor_id).then(function (professor) {
        //     req.user.professor = professor;
        //     //return next()
        // })
        return next()
    }
}

const isLogado = function(req, res, next) {
    if(req.isAuthenticated()) {
        // Professor.findByPk(req.user.professor_id).then(function (professor) {
        //      req.user.eleitor = professor;
        // //     return next()
        //  })
        return next()
    }
    req.flash('error_msg', 'Você não tem autorização para acessar esse conteúdo')
    res.redirect('/usuario/login')
}

export {coordenador, de, supremo, isLogado}