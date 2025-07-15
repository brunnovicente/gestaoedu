import express from 'express';
const router = express.Router();

import IngressoController from "../controllers/IngressoController.js";
import {autorizar, isLogado} from "../helpers/permissao.js"

router.get('/codigo',  IngressoController.gerar)

export default router;