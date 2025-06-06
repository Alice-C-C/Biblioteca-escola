import express from "express"
import emprestimo from "../controllers/emprestimo.js"
const router = express.Router()
import formato from "../middleware/data.js"

router.get('/', emprestimo.index)
router.get('/:id', emprestimo.show)
router.post('/', formato, emprestimo.store)
router.put('/:id', emprestimo.update)
router.delete('/:id', emprestimo.destroy)



export default router