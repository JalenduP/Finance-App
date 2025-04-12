import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BudgetScreen() {
  const [budgets, setBudgets] = useState({});
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const loadBudgets = async () => {
      const data = await AsyncStorage.getItem('budgets');
      setBudgets(JSON.parse(data) || {});
    };
    loadBudgets();
  }, []);

  const saveBudget = async () => {
    const newBudgets = { ...budgets, [category]: parseFloat(amount) };
    await AsyncStorage.setItem('budgets', JSON.stringify(newBudgets));
    setBudgets(newBudgets);
    setCategory('');
    setAmount('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Set Category Budget</Text>
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input} />
      <TextInput placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} style={styles.input} />
      <Button title="Save Budget" onPress={saveBudget} />

      <Text style={styles.heading}>Current Budgets:</Text>
      {Object.keys(budgets).map((cat, i) => (
        <Text key={i}>{cat}: ₹{budgets[cat]}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 }
});
