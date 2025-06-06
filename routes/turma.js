import express from 'express'
const router = express.Router()

import TurmaController from "../controllers/TurmaController.js"
import {autorizar, isLogado} from "../helpers/permissao.js"

router.get('/', autorizar(['Coordenador','DE']), TurmaController.index)
router.post('/salvar', autorizar(['Coordenador','DE']), TurmaController.salvar)

export default router