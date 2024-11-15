import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";

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
    }

}//Fim do Módulo