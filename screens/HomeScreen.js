import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem('transactions');
      const transactions = JSON.parse(data) || [];
      const inc = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
      const exp = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
      setIncome(inc);
      setExpenses(exp);
      setBalance(inc - exp);
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Balance: ₹{balance}</Text>
      <Text>Income: ₹{income}</Text>
      <Text>Expenses: ₹{expenses}</Text>
      {expenses <= 10000 && <Text style={styles.congrats}>🎉 You're under budget!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  congrats: { marginTop: 10, color: 'green' }
});
