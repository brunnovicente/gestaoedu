import express from 'express';
const router = express.Router();
import CalendarioController from '../controllers/CalendarioController.js';

router.get('/', CalendarioController.index)
router.post('/salvar', CalendarioController.salvar)
router.get('/cadastrar', CalendarioController.cadastrar)

export default router;