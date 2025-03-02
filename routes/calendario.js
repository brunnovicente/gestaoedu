import express from 'express';
const router = express.Router();
import CalendarioController from '../controllers/CalendarioController.js';

router.get('/gerar/:id', CalendarioController.gerar)
router.get('/detalhar/:id', CalendarioController.detalhar)

export default router;