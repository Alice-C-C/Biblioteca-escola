import express from "express"
import 'dotenv/config'
import emprestimo from "./routers/emprestimo.js"

const app = express()

app.use(express.json())
app.use('/emprestimo', emprestimo)


app.listen(5000, ()=>{
    console.log(`Server running port`);
})