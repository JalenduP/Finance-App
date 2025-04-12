import AsyncStorage from '@react-native-async-storage/async-storage';

// Generic save function
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Generic load function
export const loadData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
};

// Generic delete function
export const clearData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

export const resetAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All data has been reset.');
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };
  
