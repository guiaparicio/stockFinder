// src/services/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const retrieveData = async (setAcoes) => {
  try {
    const savedData = await AsyncStorage.getItem('acoes');
    if (savedData) {
      setAcoes(JSON.parse(savedData));
    }
  } catch (error) {
    console.error('Erro ao recuperar dados salvos:', error);
  }
};

export const saveData = async (data) => {
  try {
    await AsyncStorage.setItem('acoes', JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};
