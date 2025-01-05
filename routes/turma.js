import express from 'express';
const router = express.Router();

import TurmaController from "../controllers/TurmaController.js";
import {autorizar, isLogado} from "../helpers/permissao.js"

router.get('/', autorizar(['Coordenador']), TurmaController.index)

export default router;