// src/components/StockList/StockList.js
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import styles from './StockListStyles';

const StockList = ({ data, onRemove }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Código: {item.codigo}</Text>
      <Text>Preço de Mercado: {item.preco}</Text>
      <Button title="Excluir" onPress={() => onRemove(item.codigo)} />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default StockList;
