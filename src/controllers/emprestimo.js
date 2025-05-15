import Emprestimo from "../models/emprestimo.js";
import Aluno from "../models/aluno.js";

const calcularStatus = async (emprestimo) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
  
    if (emprestimo.status === 'Devolvido') {
      return 'Devolvido';
    }
  
    const dataDevolucao = new Date(emprestimo.Data_devolucao);
    dataDevolucao.setHours(0, 0, 0, 0);
  
    const novoStatus = dataDevolucao < hoje ? 'Atrasado' : 'Pendente';
  
    if (emprestimo.status !== novoStatus) {
      emprestimo.status = novoStatus;
      await emprestimo.save();
    }
  
    return novoStatus;
  };
  
  // Atualiza status de todos os empréstimos pendentes/atrasados
  const atualizarTodosStatus = async () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
  
    const emprestimos = await Emprestimo.find({ status: { $ne: 'Devolvido' } });
  
    for (const emprestimo of emprestimos) {
      const dataDevolucao = new Date(emprestimo.Data_devolucao);
      dataDevolucao.setHours(0, 0, 0, 0);
      console.log(`Emprestimo ID: ${emprestimo._id}`);
      console.log(`Status atual: ${emprestimo.status}`);
      console.log(`Data de devolução: ${dataDevolucao}`);
  
      const novoStatus = dataDevolucao < hoje ? 'Atrasado' : 'Pendente';
  
      if (emprestimo.status !== novoStatus) {
        emprestimo.status = novoStatus;
        await emprestimo.save();
      }
    }
  };
  
  function formatarData(data) {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  
  // Listar empréstimos com filtro de status (após atualizar status)
  const index = async (req, res) => {
    try {
      console.log('Atualizando status...');
      await atualizarTodosStatus();
      console.log('Status atualizados.');
  
      const emprestimos = await Emprestimo.find();
      console.log('Empréstimos após atualização:', emprestimos.map(e => ({id: e._id, status: e.status})));
  
      const statusFiltro = req.query.status || '';
  
      const emprestimosFiltrados = statusFiltro
        ? emprestimos.filter(e => e.status === statusFiltro)
        : emprestimos;
  
      const emprestimosFormatados = emprestimosFiltrados.map(emprestimo => ({
        ...emprestimo.toObject(),
        Data_emprestado: formatarData(emprestimo.Data_emprestado),
        Data_devolucao: formatarData(emprestimo.Data_devolucao),
        status: String(emprestimo.status),
      }));
  
      res.status(200).json(emprestimosFormatados);
    } catch (err) {
      console.error('Erro ao buscar empréstimos:', err.message);
      res.status(500).json({ error: 'Erro ao buscar os empréstimos.', details: err.message });
    }
  };
  
// Cadastrar um novo empréstimo
const store = async (req, res) => {
  try {
    const novoEmprestimo = await Emprestimo.create(req.body);
    res.status(201).json({ message: "Empréstimo registrado com sucesso", data: novoEmprestimo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar empréstimo.' });
  }
};


// Atualizar um empréstimo
const update = async (req, res) => {
  try {
    const emprestimoAtualizado = await Emprestimo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!emprestimoAtualizado) {
      return res.status(404).json({ error: 'Empréstimo não encontrado para atualizar' });
    }
    res.status(200).json({ message: "Atualizado com sucesso", data: emprestimoAtualizado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar empréstimo.' });
  }
};

// Deletar um empréstimo
const destroy = async (req, res) => {
  try {
    const emprestimoDeletado = await Emprestimo.findByIdAndDelete(req.params.id);
    if (!emprestimoDeletado) {
      return res.status(404).json({ error: 'Empréstimo não encontrado para deletar' });
    }
    res.status(200).json({ message: "Deletado com sucesso", data: emprestimoDeletado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar empréstimo.' });
  }
};

export default { store, index, update, destroy };
