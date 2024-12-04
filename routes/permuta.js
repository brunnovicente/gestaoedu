import express from 'express';
const router = express.Router();

import PermutaController from "../controllers/PermutaController.js";
import {autorizar, isLogado} from "../helpers/permissao.js"

router.get('/', autorizar(['Coordenador']), PermutaController.index)
router.get('/cadastrar/:id', PermutaController.cadastrar)
router.post('/cadastrar', PermutaController.salvar)
router.get('/listar', (req, res) => res.render('permuta/listar', {layout: 'secundario'}))
router.post('/listar', PermutaController.listar)
router.get('/minhas/:id', PermutaController.minhas)
router.get('/abrir/:id', autorizar(['Coordenador']), PermutaController.abrir)
router.get('/fechar/:id', autorizar(['Coordenador']), PermutaController.fechar)

export default router;