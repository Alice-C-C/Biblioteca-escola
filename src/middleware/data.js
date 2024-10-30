const formatar = (req,res,next)=>{
    const dataAtual = new Date();

    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full',
    timeZone: 'America/Sao_Paulo',

});
// console.log(dataFormatada.format(dataAtual));
req.body.Data_emprestado = dataFormatada.format(dataAtual)

dataAtual.setDate(dataAtual.getDate() + 7)
req.body.Data_devolucao = dataFormatada.format(dataAtual)
next()
}

export default formatar
