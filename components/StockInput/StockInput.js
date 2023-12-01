// src/components/StockInput/StockInput.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import styles from './StockInputStyles';

const StockInput = ({ onSubmit }) => {
  const [codigoAcao, setCodigoAcao] = useState('');

  const handleCodigoAcaoChange = (text) => {
    setCodigoAcao(text);
  };

  const handleAddAcao = () => {
    onSubmit(codigoAcao);
    setCodigoAcao('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleCodigoAcaoChange}
        value={codigoAcao}
        placeholder="Digite o código do Ativo"
      />
      <Button title="Adicionar" onPress={handleAddAcao} style={styles.button} />
    </View>
  );
};

export default StockInput;
