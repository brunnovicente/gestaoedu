import express from 'express';
const router = express.Router();
import principalController from '../controllers/PrincipalController.js';
import {autorizar, isLogado} from "../helpers/permissao.js"

router.get('/', isLogado, principalController.index)

export default router;