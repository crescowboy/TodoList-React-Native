import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTodoScreen({ route, navigation }: any) {
  const { handleAdd } = route.params;
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);

  const submit = () => {
  if (text.trim()) {
    handleAdd({
      id: Date.now(),
      text,
      completed: false,
      deadline: deadline ? deadline.toISOString().split('T')[0] : undefined,
    });
    navigation.goBack();
  }
};

  const openDatePicker = () => setShowPicker(true);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {setDeadline(selectedDate);}
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
        <TouchableOpacity onPress={openDatePicker} style={styles.dateBtn}>
          <Text style={styles.dateBtnText}>
            {deadline ? `Fecha límite: ${deadline.toLocaleDateString()}` : 'Seleccionar fecha límite'}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={deadline || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />
        )}
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
  dateBtn: {
    backgroundColor: '#e3eafc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  dateBtnText: {
    color: '#1976d2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});
