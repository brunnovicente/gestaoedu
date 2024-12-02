import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import Usuario from "../models/Usuario.js";
import Professor from "../models/Professor.js";
import auxiliar from "../helpers/auxiliar.js"
const router = express.Router();

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
            res.redirect('/usuario/login')
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
        Usuario.findOne({username:siape}, {
            include: {
                model:Professor,
                as: 'professor'
            }
        }).then(function (usuario) {
            if(usuario.username === siape){
                let codigo = auxiliar.gerarCodigo(5)
                Usuario.update({codigo: codigo}, {where: {username: siape}}).then(function () {
                    req.flash('success_msg', 'Código enviado para o e-mail '+usuario.professor.email)
                    res.redirect('/permuta/listar')
                })
            }
        })
    },

}//Fim do Módulo