import express from 'express';
const router = express.Router();

import DiaController from "../controllers/DiaController.js";
import {autorizar, isLogado} from "../helpers/permissao.js"

router.post('/salvar', DiaController.salvar)
router.get('/excluir/:id', DiaController.excluir)

export default router;