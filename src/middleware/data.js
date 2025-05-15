const formatar = (req, res, next) => {
    const dataAtual = new Date();
  
    req.body.Data_emprestado = dataAtual;
  
    const dataDevolucao = new Date();
    dataDevolucao.setDate(dataDevolucao.getDate() + 7);
    req.body.Data_devolucao = dataDevolucao;
  
    next();
  };
  
  export default formatar;