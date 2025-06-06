import express from 'express';
const router = express.Router();
import CursoController from '../controllers/CursoController.js';
import {autorizar, isLogado} from "../helpers/permissao.js";

router.get('/', autorizar(['Coordenador','DE']) ,CursoController.index)
router.post('/editar', autorizar(['DE']) ,CursoController.editar)

export default router;