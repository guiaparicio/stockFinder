// src/api/api.js
export const fetchMarketData = async (codigoAcao) => {
  try {
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${codigoAcao}.SA?interval=1d`);
    const data = await response.json();
    const marketPrice = data.chart.result[0].meta.regularMarketPrice;
    return marketPrice;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw new Error('Erro ao buscar dados da API. Por favor, tente novamente.');
  }
};

export const updateMarketPrices = async (acoes, setAcoes, saveData) => {
  try {
    const updatedAcoes = await Promise.all(acoes.map(async (acao) => {
      const marketPrice = await fetchMarketData(acao.codigo);
      return { codigo: acao.codigo, preco: marketPrice };
    }));

    setAcoes(updatedAcoes);
    saveData(updatedAcoes);
  } catch (error) {
    console.error('Erro ao atualizar preços de mercado:', error);
  }
};