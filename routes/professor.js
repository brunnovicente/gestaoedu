import express from 'express';
const router = express.Router();
import professorController from '../controllers/ProfessorController.js';
import {coordenador, de, supremo, isLogado} from '../helpers/permissao.js'

router.get('/', coordenador, professorController.index);

export default router;