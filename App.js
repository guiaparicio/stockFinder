import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [codigoAcao, setCodigoAcao] = useState('');
  const [regularMarketPrice, setRegularMarketPrice] = useState(null);
  const [acoes, setAcoes] = useState([]);

  useEffect(() => {
    // Recupera os dados salvos ao iniciar o aplicativo
    retrieveData();

    // Define um temporizador para atualizar os preços a cada 10 minutos
    const timerId = setInterval(() => {
      updateMarketPrices();
    }, 10 * 60 * 1000);

    // Executa a atualização imediatamente ao iniciar o aplicativo
    updateMarketPrices();

    // Limpa o temporizador ao desmontar o componente
    return () => clearInterval(timerId);
  }, []);

  const handleCodigoAcaoChange = (text) => {
    setCodigoAcao(text);
  };

  const showAlert = async () => {
    try {
      const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${codigoAcao}.SA?interval=1d`);
      const data = await response.json();
  
      const marketPrice = data.chart.result[0].meta.regularMarketPrice;
      setRegularMarketPrice(marketPrice);
  
      const novaAcao = { codigo: codigoAcao, preco: marketPrice };
      const novasAcoes = [...acoes, novaAcao];
      setAcoes(novasAcoes);
  
      // Salva os dados no AsyncStorage
      saveData(novasAcoes);
     
      // Limpa o campo de input
      setCodigoAcao('');
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados da API. Por favor, tente novamente.');
    }
  };

  const retrieveData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('acoes');
      if (savedData) {
        setAcoes(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Erro ao recuperar dados salvos:', error);
    }
  };

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem('acoes', JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  const updateMarketPrices = async () => {
    try {
      const updatedAcoes = await Promise.all(acoes.map(async (acao) => {
        const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${acao.codigo}.SA?interval=1d`);
        const data = await response.json();
        const marketPrice = data.chart.result[0].meta.regularMarketPrice;
        return { codigo: acao.codigo, preco: marketPrice };
      }));

      setAcoes(updatedAcoes);
      saveData(updatedAcoes);
    } catch (error) {
      console.error('Erro ao atualizar preços de mercado:', error);
    }
  };

  const handleExcluirAcao = (codigo) => {
    const novasAcoes = acoes.filter((acao) => acao.codigo !== codigo);
    setAcoes(novasAcoes);
    saveData(novasAcoes);
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Código: {item.codigo}</Text>
      <Text>Preço de Mercado: {item.preco}</Text>
      <Button title="Excluir" onPress={() => handleExcluirAcao(item.codigo)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Stock Finder</Text>
      </View>
      <Text>Digite o código da Ação:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleCodigoAcaoChange}
        value={codigoAcao}
        placeholder="Ex: ITSA4"
      />
      <Button title="Adicionar" onPress={showAlert} />
      <FlatList
        data={acoes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#0a4aac',
    paddingTop: 40,
    paddingBottom: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom:30
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    fontSize: 20,
    padding: 20,
    width: '80%'
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'gray',
  },
});
