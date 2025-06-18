import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AddTodoScreen({ route, navigation }: any) {
  const { handleAdd, todoToEdit, handleUpdate } = route.params || {};
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (todoToEdit) {
      setText(todoToEdit.text);
      setDeadline(todoToEdit.deadline ? new Date(todoToEdit.deadline) : undefined);
    }
  }, [todoToEdit]);

  const submit = () => {
    if (text.trim()) {
      if (todoToEdit && handleUpdate) {
        handleUpdate({
          ...todoToEdit,
          text,
          deadline: deadline ? deadline.toISOString().split('T')[0] : undefined,
        });
      } else if (handleAdd) {
        handleAdd({
          id: Date.now(),
          text,
          completed: false,
          deadline: deadline ? deadline.toISOString().split('T')[0] : undefined,
        });
      }
      navigation.goBack();
    }
  };

  const openDatePicker = () => setShowPicker(true);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) { setDeadline(selectedDate); }
  };

  return (
    <View style={styles.container}>
      {/* Input arriba */}
      <TextInput
        placeholder="¿Qué tienes que hacer?"
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholderTextColor="#888"
        autoFocus
        returnKeyType="done"
        onSubmitEditing={submit}
      />

      {/* Fila de fecha */}
      <View style={styles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <MaterialIcons name="event" size={18} color="#1976d2" style={{ marginRight: 4 }} />
          <Text style={styles.dateText}>
            {deadline
              ? `Fecha límite: ${deadline.toLocaleDateString()}`
              : 'Sin fecha límite'}
          </Text>
        </View>
        <TouchableOpacity onPress={openDatePicker} style={styles.flatBtn}>
          <MaterialIcons name="date-range" size={18} color="#1976d2" style={{ marginRight: 4 }} />
          <Text style={styles.flatBtnText}>Elegir fecha</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={deadline || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      {/* Botón Guardar personalizado */}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={submit}
        disabled={!text.trim()}
        activeOpacity={0.8}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="save" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.saveBtnText}>
            Guardar
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fc',
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginTop: 28,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  dateText: {
    fontSize: 15,
    color: '#555',
    flex: 1,
  },
  flatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginLeft: 12,
  },
  flatBtnText: {
    color: '#1976d2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  saveBtn: {
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    opacity: 1,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
