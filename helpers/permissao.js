import Professor from "../models/Professor.js";

function getCategoria(c){
    switch(c){
        case 0:
            return 'Discente'
        case 1:
            return 'Docente'
        case 2:
            return 'Coordenador'
        case 3:
            return 'DE'
        case 4:
            return "Supremo"
    }
}

function autorizar(categorias){
    return function (req, res, next){
        if(!req.isAuthenticated()){
            req.flash('success_msg', 'Você precisa realizar o login!')
            res.redirect('/usuario/login')
        }

        if(!categorias.includes(getCategoria(req.user.categoria))){
            req.flash('error_msg', 'Você não tem permissão para acessar esse conteúdo.')
            res.redirect('/principal')
        }
    }
}

const discente = function (req, res, next){
    //Categoria 0
}

const docente = function (req, res, next){
    //Categoria 1
}

const coordenador = function(req, res, next) {
    if(req.isAuthenticated() && req.user.categoria === 2) {
        return next()
    }
    req.flash('error_msg', 'Você não tem autorização para acessar esse conteúdo')
    res.redirect('/principal')
}

const de = function (req, res, next){
    if(req.isAuthenticated() && req.user.categoria === 3) {
        return next()
    }
    req.flash('error_msg', 'Você não tem autorização para acessar esse conteúdo')
    res.redirect('/principal')
}

const supremo = function (req, res, next){
    if(req.isAuthenticated() && req.user.categoria === 4) {
        return next()
    }
}

const isLogado = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    req.flash('error_msg', 'Você não tem autorização para acessar esse conteúdo')
    res.redirect('/usuario/login')
}

export {coordenador, de, supremo, isLogado}