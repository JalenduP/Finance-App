import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('transactions');
      setTransactions(JSON.parse(data) || []);
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      {transactions.map((t, index) => (
        <Text key={index}>{t.date} - {t.description} - ₹{t.amount} ({t.type})</Text>
      ))}
    </ScrollView>
  );
}
