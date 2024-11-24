import express from 'express';
const router = express.Router();
import permutaController from '../controllers/PermutaController.js';
import PermutaController from "../controllers/PermutaController.js";

router.get('/cadastrar/:id', PermutaController.cadastrar)
router.get('/listar', (req, res) => res.render('permuta/listar', {layout: 'secundario'}))
router.post('/listar', permutaController.listar)

export default router;