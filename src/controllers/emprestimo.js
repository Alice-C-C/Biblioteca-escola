import Emprestimo from "../models/emprestimo.js";

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
    const connect = await Emprestimo.create(req.body)
    res.status(201).json(connect)
    }catch(err){
        console.log(err);
    }
}

const index = async (req,res)=>{
    try{
        const emprestimos = await Emprestimo.find();
        const emprestimosComStatus = emprestimos.map(emprestimo => ({
            ...emprestimo.toObject(),
            status: calcularStatus(emprestimo)
        }));
        res.status(200).json(emprestimosComStatus);
        
    }catch(err){
        console.log(err);
    }
}

const show = async (req,res)=>{
    try{
        const connect = await Emprestimo.findById(req.params.id)
        res.status(200).json(connect)
    }catch(err){
        console.log(err);
    }
}
const getEmprestimoByAluno = async (req, res) => {
    try {
      const aluno = await Emprestimo.find({"aluno":req.params.aluno}).exec()
      res.status(200).json(aluno);
    } catch (error) {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
};
  
const getEmprestimoByLivro= async (req, res) => {
    try {
      const Livro = await Emprestimo.find({"Livro":req.params.Livro_emprestado} )
      res.status(200).json(Livro);
    } catch (error) {
      res.status(404).json({ error: 'Livro não encontrado' });
    }
};

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

export default {store, index, show, update, destroy, getEmprestimoByAluno, getEmprestimoByLivro}