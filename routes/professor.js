import express from 'express';
const router = express.Router();
import professorController from '../controllers/ProfessorController.js';
import {autorizar, isLogado} from "../helpers/permissao.js"

router.get('/', autorizar(['Coordenador']), professorController.index);

export default router;