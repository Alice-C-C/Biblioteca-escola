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
    try {
        const status = req.query.status || '';
        let query = {};
        if (status) {
            query.status = status;
        }

        const emprestimos = await Emprestimo.find(query);

        const emprestimosAtualizados = await Promise.all(
            emprestimos.map(async (emprestimo) => {
                const novoStatus = calcularStatus(emprestimo);

                if (emprestimo.status !== novoStatus) {
                    emprestimo.status = novoStatus;
                    await emprestimo.save(); // salva no banco
                }

                return emprestimo.toObject(); // retorna com novo status
            })
        );

        res.status(200).json(emprestimosAtualizados);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro ao buscar empréstimos' });
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