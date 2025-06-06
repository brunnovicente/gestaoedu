import express from 'express';
const router = express.Router();
import CalendarioController from '../controllers/CalendarioController.js';
import {autorizar, isLogado} from "../helpers/permissao.js"

router.get('/', isLogado, CalendarioController.index)
router.post('/salvar', autorizar(['DE']),CalendarioController.salvar)
router.get('/cadastrar', autorizar(['DE']), CalendarioController.cadastrar)

export default router;