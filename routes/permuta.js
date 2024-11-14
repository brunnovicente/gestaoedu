import express from 'express';
const router = express.Router();
import permutaController from '../controllers/PermutaController.js';

router.get('/cadastrar', (req, res) => {
    res.render('permuta/cadastrar', {layout: 'secundario'});
})

export default router;