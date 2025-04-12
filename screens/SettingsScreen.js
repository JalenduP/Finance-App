import React from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { resetAllData, backupDataToFile, restoreDataFromFile } from '../utils/storage';

export default function SettingsScreen() {
  const confirmReset = () => {
    Alert.alert(
      'Confirm Reset',
      'Are you sure you want to delete all your data? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetAllData();
            Alert.alert('Success', 'All data has been reset.');
          }
        }
      ]
    );
  };

  const handleBackup = async () => {
    const path = await backupDataToFile();
    Alert.alert('Backup complete', `Data saved at:\n${path}`);
  };

  const handleRestore = async () => {
    await restoreDataFromFile();
    Alert.alert('Restore complete', 'Data has been restored from backup.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <Button title="🔁 Reset All Data" color="red" onPress={confirmReset} />
      <View style={styles.spacer} />

      <Button title="📤 Backup Data" onPress={handleBackup} />
      <View style={styles.spacer} />

      <Button title="📥 Restore Data" onPress={handleRestore} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  spacer: {
    height: 20,
  }
});
