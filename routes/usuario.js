import express from 'express';
const router = express.Router();
import usuarioController from '../controllers/UsuarioController.js';

router.get('/login', (req, res) => res.render('usuario/login', {layout: 'secundario'}));
router.post('/login', usuarioController.login);
router.get('/logout', usuarioController.logout);
router.get('/senha/:senha', usuarioController.senha);
export default router;