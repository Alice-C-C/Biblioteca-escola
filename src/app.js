import express from "express";
import 'dotenv/config';
import emprestimo from "./routers/emprestimo.js";
import aluno from "./routers/aluno.js";
import path from 'path';
import connectDB from './config/db.js';

const app = express();

app.use(express.json());
app.use('/emprestimo', emprestimo);
app.use('/alunos', aluno);
app.use(express.static(path.join(path.resolve(), 'public')));

const PORT = process.env.API_PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao iniciar o servidor:', err);
});
