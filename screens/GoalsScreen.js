import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoalsScreen() {
  const [goal, setGoal] = useState('');
  const [amount, setAmount] = useState('');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const loadGoal = async () => {
      const g = await AsyncStorage.getItem('goal');
      if (g) {
        const { target, current } = JSON.parse(g);
        setGoal(target);
        setCurrent(current);
      }
    };
    loadGoal();
  }, []);

  const saveGoal = async () => {
    await AsyncStorage.setItem('goal', JSON.stringify({ target: parseFloat(amount), current: 0 }));
    setGoal(amount);
    setCurrent(0);
    setAmount('');
  };

  const addToGoal = async () => {
    const updated = current + 500; // Simulate saving ₹500
    await AsyncStorage.setItem('goal', JSON.stringify({ target: parseFloat(goal), current: updated }));
    setCurrent(updated);
  };

  const percentage = goal ? Math.min((current / goal) * 100, 100).toFixed(1) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending Goal</Text>
      {!goal ? (
        <>
          <TextInput placeholder="Target Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" style={styles.input} />
          <Button title="Set Goal" onPress={saveGoal} />
        </>
      ) : (
        <>
          <Text>Target: ₹{goal}</Text>
          <Text>Saved: ₹{current}</Text>
          <Text>Progress: {percentage}%</Text>
          <Button title="Add ₹500 to Goal" onPress={addToGoal} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 }
});
