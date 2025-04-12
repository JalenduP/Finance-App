import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function FAQScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Frequently Asked Questions</Text>

      <Text style={styles.q}>Q: How do I add an expense?</Text>
      <Text style={styles.a}>A: Go to the "Add" tab and fill in the form with your expense details.</Text>

      <Text style={styles.q}>Q: Can I track income too?</Text>
      <Text style={styles.a}>A: Yes, just set the transaction type to "income".</Text>

      <Text style={styles.q}>Q: Does this app work offline?</Text>
      <Text style={styles.a}>A: Yes, all data is stored locally on your device using AsyncStorage.</Text>

      <Text style={styles.q}>Q: Can I sync with my bank?</Text>
      <Text style={styles.a}>A: Not yet, but we plan to support it using secure APIs like Plaid in future versions.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  q: { fontWeight: 'bold', marginTop: 10 },
  a: { marginBottom: 10 }
});
