import express from 'express';
const router = express.Router();

import DiarioController from "../controllers/DiarioController.js";
import {autorizar, isLogado} from "../helpers/permissao.js"

router.get('/', autorizar(['Coordenador','DE']), DiarioController.index)
//router.get('/cadastrar', autorizar(['Coordenador']), DiarioController.cadastrar)
router.post('/salvar', autorizar(['Coordenador','DE']), DiarioController.salvar)
router.get('/editar/:id', autorizar(['Coordenador','DE']), DiarioController.editar)
router.post('/editar', autorizar(['Coordenador','DE']), DiarioController.modificar)
router.post('/editarprofessor', autorizar(['Coordenador','DE']), DiarioController.editarprofessor)

export default router;