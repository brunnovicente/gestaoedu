import bcrypt from "bcrypt";
import passport from "passport";
import Usuario from "../models/Usuario.js";
import Professor from "../models/Professor.js";
import auxiliar from "../helpers/auxiliar.js"
import comunicador from "../helpers/comunicador.js"

export default {

    login: function(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/principal',
            failureRedirect: '/usuario/login',
            failureFlash: true
        })(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout(function (erro){
            req.flash('success_msg', 'Usuário deslogado com sucesso.')
            res.redirect('/principal')
        })
    },

    senha:function(req,res){
        bcrypt.genSalt(10, function (erro, salt) {
            bcrypt.hash(req.params.senha, salt, function (erro, hash) {
                res.send(hash)
            })
        })
    },

    listar: function (req,res){
        res.render('usuario/listar')
    },

    promover: function(req, res){
        const usuario = Usuario.findByPk(req.params.id);

        if(usuario.categoria === 1){
            usuario.categoria = 2
        }else if(usuario.categoria === 2){
            usuario.categoria = 3
        }

        Usuario.update(usuario, {
            where: {
                id: usuario.id
            }
        }).then(function () {
            res.flash('success_msg', 'Professor promovido com sucesso!')
            req.redirect('/professor')
        })
    },//fim do promover
    codigo: function(req,res){
        const siape = req.body.siape
        Usuario.findOne({
            where:{
                username: siape
            },
            include:{
                model: Professor,
                as: 'professor',
            }
        }).then(function (usuario) {
            console.log('Pegou o usuario: '+usuario.professor.nome)
            let codigo = auxiliar.gerarCodigo(5)
            if(usuario.username === siape){
                Usuario.update({
                        codigo: codigo
                    },{
                        where:{
                            username: siape
                        }
                    }).then(function () {
                        usuario.codigo = codigo
                    comunicador.enviarCodigo(usuario)
                    req.flash('success_msg', 'Código enviado para o e-mail '+usuario.professor.email)
                    res.redirect('/usuario/esqueceu')
                })
            }
        })
    },

    esqueceu: function(req,res){
        let codigo = req.body.codigo
        Usuario.findOne({
            where:{
                codigo: codigo
            },
            include:{
                model: Professor,
                as: 'professor'
            }
        }).then(function (usuario) {
            if(!usuario){
                req.flash('error_msg', 'Código Inválido')
                res.redirect('/usuario/esqueceu')
            }
            let senha1 = req.body.senha1
            let senha2 = req.body.senha2
            if(senha1 === senha2){
                bcrypt.genSalt(10, function (erro, salt) {
                    bcrypt.hash(senha1, salt, function (erro, hash) {
                        Usuario.update({
                            password: hash
                        }, {
                            where:{
                                id: usuario.id
                            }
                        }).then(function (){
                            req.flash('success_msg', 'Senha alterada com sucesso!')
                            res.redirect('/usuario/login')
                        })
                    })
                })
            }else{
                req.flash('error_msg', 'Repita a mesma senha')
                res.redirect('/usuario/esqueceu')
            }
        }).catch(function (error) {
            req.flash('error_msg', 'Código Inválido')
            res.redirect('/usuario/esqueceu')
        })
    },
    alterarsenha: function (req, res){
        let senha1 = req.body.senha1
        let senha2 = req.body.senha2
        if(senha1 === senha2){
            bcrypt.genSalt(10, function (erro, salt) {
                bcrypt.hash(senha1, salt, function (erro, hash) {
                    Usuario.update({
                        password: hash
                    }, {
                        where:{
                            id: req.user.id
                        }
                    }).then(function (){
                        req.flash('success_msg', 'Senha alterada com sucesso!')
                        res.redirect('/principal')
                    })
                })
            })
        }else{
            req.flash('error_msg', 'Repita a mesma senha')
            res.redirect('/usuario/alterarsenha')
        }
    }

}//Fim do Módulo