import express from 'express';
const router = express.Router();
import permutaController from '../controllers/PermutaController.js';

router.get('/cadastrar', (req, res) => res.render('permuta/cadastrar', {layout: 'secundario'}))
router.get('/listar', (req, res) => res.render('permuta/listar', {layout: 'secundario'}))
router.post('/listar', permutaController.listar)

export default router;