import express from 'express';
const router = express.Router();
import professorController from '../controllers/ProfessorController.js';
import {autorizar, isLogado} from "../helpers/permissao.js"

router.get('/', autorizar(['Coordenador', 'DE', 'Supremo']), professorController.index);
router.post('/salvar', autorizar(['Coordenador', 'DE']), professorController.salvar);
router.get('/ativar/:id', autorizar(['DE']), professorController.ativar);
router.get('/desativar/:id', autorizar(['DE']), professorController.desativar);

export default router;