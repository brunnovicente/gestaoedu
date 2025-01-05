import express from 'express';
const router = express.Router();
import CursoController from '../controllers/CursoController.js';
import {autorizar, isLogado} from "../helpers/permissao.js";

router.get('/', autorizar(['Coordenador']) ,CursoController.index)

export default router;