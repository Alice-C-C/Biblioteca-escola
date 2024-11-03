import Emprestimo from "../models/emprestimo.js";
import Aluno from "../models/aluno.js";

const calcularStatus = (emprestimo) => {
    const hoje = new Date();
    
    if (emprestimo.status === 'Devolvido') {
        return 'Devolvido';
    } else if (hoje > emprestimo.Data_devolucao) {
        return 'Atrasado';
    } else {
        return 'Pendente';
    }
};


const store = async (req,res)=>{
    try{
    console.log(req.body)
    const connect = await Emprestimo.create(req.body)
    res.status(201).json(connect)
    }catch(err){
        console.log(err);
    }
}

const index = async (req, res) => {
    console.log('Parâmetros da consulta:');

    try {
        const status = req.query.status || ''; // Obtém o parâmetro de status, se existir
        console.log(status)

        let query = {}; // Inicializa a consulta como um objeto vazio
        // Adiciona condição à consulta se o parâmetro de status estiver presente
        if (status) {
            query.status = status; // Filtra pelo status
        }

        // Executa a consulta com base nas condições acima
        const emprestimos = await Emprestimo.find(query);

        // Adiciona o status calculado a cada empréstimo retornado
        const emprestimosComStatus = emprestimos.map(emprestimo => ({
            ...emprestimo.toObject(),
            status: calcularStatus(emprestimo)
        }));

        // Retorna os empréstimos com status
        res.status(200).json(emprestimosComStatus);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar empréstimos' }); // Retorna um erro se a consulta falhar
    }
};


const show = async (req,res)=>{
    try{
        const connect = await Emprestimo.findById(req.params.id)
        res.status(200).json(connect)
    }catch(err){
        console.log(err);
    }
}
  
const update = async (req,res)=>{
    try{
        const connect = await Emprestimo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(connect)
    }catch(err){
        console.log(err);
    }
}

const destroy = async (req,res)=>{
    try{
        const connect = await Emprestimo.findByIdAndDelete(req.params.id)
        res.status(200).json(connect)
    }catch(err){
        console.log(err);
    }
}

export default {store, index, show, update, destroy}