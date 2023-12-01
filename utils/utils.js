// src/utils/utils.js
import { Alert } from 'react-native';

export const showAlert = (title, message) => {
  Alert.alert(title, message);
};