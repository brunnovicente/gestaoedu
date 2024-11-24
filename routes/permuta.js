import express from 'express';
const router = express.Router();
import permutaController from '../controllers/PermutaController.js';
import PermutaController from "../controllers/PermutaController.js";

router.get('/', PermutaController.index)
router.get('/cadastrar/:id', PermutaController.cadastrar)
router.post('/cadastrar', PermutaController.salvar)
router.get('/listar', (req, res) => res.render('permuta/listar', {layout: 'secundario'}))
router.post('/listar', permutaController.listar)

export default router;