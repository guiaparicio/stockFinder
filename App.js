// src/App.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { updateMarketPrices } from './api/api';
import { retrieveData, saveData } from './services/storage';
import { handleAddAcao, handleRemoveAcao } from './utils/actions';
import StockInput from './components/StockInput/StockInput';
import StockList from './components/StockList/StockList';
import { commonStyles } from './styles/commonStyles';

const App = () => {
  
  const [acoes, setAcoes] = useState([]);

  useEffect(() => {
    retrieveData(setAcoes);
    const timerId = setInterval(() => updateMarketPrices(acoes, setAcoes, saveData), 10 * 60 * 1000);
    updateMarketPrices(acoes, setAcoes, saveData);
    return () => clearInterval(timerId);
  }, []);  

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerText}>Stock Finder</Text>
      </View>
      <StockInput onSubmit={(codigoAcao) => handleAddAcao(codigoAcao, acoes, setAcoes, saveData)} />
      <StockList data={acoes} onRemove={(codigo) => handleRemoveAcao(codigo, acoes, setAcoes, saveData)} />
    </View>
  );
};

export default App;