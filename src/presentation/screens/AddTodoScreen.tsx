import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function AddTodoScreen({ route, navigation }: any) {
  const { handleAdd } = route.params;
  const [text, setText] = useState('');

  const submit = () => {
    if (text.trim()) {
      handleAdd(text);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          placeholder="Nueva tarea"
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholderTextColor="#888"
          autoFocus
          returnKeyType="done"
          onSubmitEditing={submit}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Agregar"
            onPress={submit}
            color="#1976d2"
            disabled={!text.trim()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    color: '#222',
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});
