import express from "express"
import aluno from "../controllers/aluno.js"
const router = express.Router()

router.get('/', aluno.index)
router.get('/buscar', aluno.buscarAlunos)
router.get('/:id', aluno.show)
router.post('/', aluno.store)
router.put('/:id', aluno.update)
router.delete('/:id', aluno.destroy)



export default router