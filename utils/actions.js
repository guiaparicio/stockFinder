export const handleAddAcao = async (codigoAcao, acoes, setAcoes, saveData) => {
    try {
      const marketPrice = await fetchMarketData(codigoAcao);
  
      const novaAcao = { codigo: codigoAcao, preco: marketPrice };
      const novasAcoes = [...acoes, novaAcao];
      setAcoes(novasAcoes);
      saveData(novasAcoes);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      showAlert('Erro', error.message);
    }
  };
  
  export const handleRemoveAcao = (codigo, acoes, setAcoes, saveData) => {
    const novasAcoes = acoes.filter((acao) => acao.codigo !== codigo);
    setAcoes(novasAcoes);
    saveData(novasAcoes);
  };
