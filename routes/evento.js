import express from 'express';
const router = express.Router();
import EventoController from '../controllers/EventoController.js';


router.get('/', EventoController.index)
router.get('/cadastro', EventoController.cadastro)
router.post('/salvar', EventoController.salvar)
router.get('/inscricao/:id', EventoController.inscricao)
router.post('/salvartime', EventoController.salvartime)
router.get('/excluirtime/:id/:aluno_id', EventoController.exlcuirtime)
router.post('/salvarmembro', EventoController.salvarmembro)

router.get('/getAluno/:matricula', EventoController.getAluno)
router.get('/verificarColetiva/:matricula', EventoController.verificarColetiva)
router.get('/verificarDuplicataIndividual/:id', EventoController.verificarDuplicataIndividual)


export default router;