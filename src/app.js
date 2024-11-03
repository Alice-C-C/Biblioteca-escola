import express from "express"
import 'dotenv/config'
import emprestimo from "./routers/emprestimo.js"
import aluno from "./routers/aluno.js"
import path from 'path';


const app = express()

app.use(express.json())
app.use('/emprestimo', emprestimo)
app.use('/alunos', aluno)
app.use(express.static(path.join(path.resolve(), 'public')));


app.listen(process.env.API_PORT, ()=>{
    console.log(`Server running port ${process.env.API_PORT}`);
})