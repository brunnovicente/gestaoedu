import express from 'express';
const router = express.Router();

import DiarioController from "../controllers/DiarioController.js";
import {autorizar, isLogado} from "../helpers/permissao.js"

router.get('/', autorizar(['Coordenador']), DiarioController.index)
router.get('/cadastrar', autorizar(['Coordenador']), DiarioController.cadastrar)
router.post('/cadastrar', autorizar(['Coordenador']), DiarioController.salvar)
router.get('/editar/:id', autorizar(['Coordenador']), DiarioController.editar)
router.post('/editar', autorizar(['Coordenador']), DiarioController.modificar)

export default router;