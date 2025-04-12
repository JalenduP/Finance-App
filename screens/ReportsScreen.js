import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';

export default function ReportsScreen() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const data = await AsyncStorage.getItem('transactions');
      const transactions = JSON.parse(data) || [];

      const categories = {};
      transactions.forEach(t => {
        if (t.type === 'expense') {
          categories[t.description] = (categories[t.description] || 0) + t.amount;
        }
      });

      const chartFormat = Object.entries(categories).map(([label, y]) => ({ x: label, y }));
      setChartData(chartFormat);
    };

    loadTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Breakdown</Text>
      {chartData.length > 0 ? (
        <VictoryPie data={chartData} colorScale="qualitative" />
      ) : (
        <Text>No data to display</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }
});
