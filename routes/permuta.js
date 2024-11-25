import express from 'express';
const router = express.Router();

import PermutaController from "../controllers/PermutaController.js";

router.get('/', PermutaController.index)
router.get('/cadastrar/:id', PermutaController.cadastrar)
router.post('/cadastrar', PermutaController.salvar)
router.get('/listar', (req, res) => res.render('permuta/listar', {layout: 'secundario'}))
router.post('/listar', PermutaController.listar)
router.get('/minhas/:id', PermutaController.minhas)

export default router;