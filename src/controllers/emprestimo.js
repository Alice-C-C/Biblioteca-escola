import Emprestimo from "../models/emprestimo.js";
import Aluno from "../models/aluno.js";

const calcularStatus = async (emprestimo) => {
    const hoje = new Date();

    if (emprestimo.status === 'Devolvido') {
        return 'Devolvido';
    } else if (hoje > emprestimo.Data_devolucao) {
        // Atualiza o status no banco para "Atrasado" se ainda não estiver assim
        if (emprestimo.status !== 'Atrasado') {
            emprestimo.status = 'Atrasado';
            await emprestimo.save();
        }
        return 'Atrasado';
    } else {
        // Se ainda não for Pendente, atualiza
        if (emprestimo.status !== 'Pendente') {
            emprestimo.status = 'Pendente';
            await emprestimo.save();
        }
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

function formatarData(data) {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  
  const index = async (req, res) => {
    try {
      const statusFiltro = req.query.status || ''; // filtro opcional por status
  
      // Monta query conforme filtro
      const query = statusFiltro ? { status: statusFiltro } : {};
  
      const emprestimos = await Emprestimo.find(query);
  
      // Mapeia os empréstimos, atualiza status na resposta e formata datas
      const emprestimosFormatados = emprestimos.map(emprestimo => {
        const statusAtualizado = calcularStatus(emprestimo);
  
        return {
          ...emprestimo.toObject(),
          Data_emprestado: formatarData(emprestimo.Data_emprestado),
          Data_devolucao: formatarData(emprestimo.Data_devolucao),
          status: statusAtualizado
        };
      });
  
      res.status(200).json(emprestimosFormatados);
    } catch (err) {
      console.error('Erro ao buscar empréstimos:', err);
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