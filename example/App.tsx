import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import PantasData from 'react-native-pantas-data';

interface AppState {
  key: string;
  text: string;
  encryptedText: string;
  decryptedText: string;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    key: "hVxvJJdypM+RieSBdf4JUFA0ozLc/26QN4EtgrSOHzo=",
    text: '',
    encryptedText: '',
    decryptedText: '',
  });

  const handleInputChange = (name: keyof AppState, value: string | number | null) => {
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEncrypt = async () => {
    try {
      const encrypted = await PantasData.simpleEncrypt(state.text, state.key);
      console.log(`encrypted ${encrypted}`);
      handleInputChange('encryptedText', encrypted);
    } catch (error) {
      console.error('Encryption error:', error);
    }
  };

  const handleDecrypt = async () => {
    try {
      const decrypted = await PantasData.simpleDecrypt(state.encryptedText, state.key);
      console.log(`encrypted ${state.encryptedText} decrypted ${decrypted}`);
      handleInputChange('decryptedText', decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Text to Encrypt:</Text>
      <TextInput
        style={styles.input}
        value={state.text}
        onChangeText={value => handleInputChange('text', value)}
        placeholder="Enter text"
      />
      <Button title="Encrypt" onPress={handleEncrypt} />
      {state.encryptedText ? (
        <>
          <Text style={styles.label}>Encrypted Text:</Text>
          <Text style={styles.output}>{state.encryptedText}</Text>
          <Button title="Decrypt" onPress={handleDecrypt} />
        </>
      ) : null}
      {state.decryptedText ? (
        <>
          <Text style={styles.label}>Decrypted Text:</Text>
          <Text style={styles.output}>{state.decryptedText}</Text>
        </>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  output: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  result: {
    marginTop: 10,
    marginBottom: 20,
  },
});
