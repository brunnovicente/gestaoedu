import express from 'express';
const router = express.Router();
import usuarioController from '../controllers/UsuarioController.js';
import {autorizar, isLogado} from "../helpers/permissao.js"

router.get('/login', (req, res) => res.render('usuario/login', {layout: 'secundario'}));
router.post('/login', usuarioController.login);
router.get('/logout', usuarioController.logout);
router.get('/senha/:senha', usuarioController.senha);
router.get('/codigo', (req, res)=> res.render('usuario/codigo', {layout: 'secundario'}));
router.post('/codigo', usuarioController.codigo);
router.get('/esqueceu', (req, res)=> res.render('usuario/esqueceu', {layout: 'secundario'}));
router.post('/esqueceu', usuarioController.esqueceu);
router.get('/alterarsenha', isLogado,(req, res)=> res.render('usuario/alterarsenha'));
router.post('/alterarsenha',isLogado, usuarioController.alterarsenha)
router.get('/promover/:id', autorizar(['Supremo']), usuarioController.promover);

export default router;