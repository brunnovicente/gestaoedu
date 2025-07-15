import express from 'express';
const router = express.Router();
import DiscenteController from "../controllers/DiscenteController.js";

router.get('/',  DiscenteController.index)
router.post('/buscar',  DiscenteController.buscar)
router.get('/ativar',  DiscenteController.ativar)

export default router;