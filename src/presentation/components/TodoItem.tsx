import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Todo } from '../../core/entities/Todo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit?: (todo: Todo) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const handleDelete = () => {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => onDelete(todo.id) },
      ]
    );
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={[
          styles.actionButton,
          styles.toggleButton,
          todo.completed && styles.completedButton,
          { marginLeft: 0, marginRight: 12 },
        ]}
        onPress={() => onToggle(todo.id)}
      >
        <MaterialIcons
          name={todo.completed ? 'check-circle' : 'radio-button-unchecked'}
          size={22}
          color={todo.completed ? '#388e3c' : '#1976d2'}
        />
      </TouchableOpacity>

      {/* Texto y deadline */}
      <TouchableOpacity style={styles.textContainer} onPress={() => onToggle(todo.id)}>
        <Text style={[styles.text, todo.completed && styles.completed]}>
          {todo.text}
        </Text>
        {todo.deadline && (
          <View style={styles.deadlineContainer}>
            <Text style={styles.deadlineLabel}>Fecha límite:</Text>
            <Text
              style={[
                styles.deadlineText,
                new Date(todo.deadline) < new Date() && !todo.completed && styles.deadlineExpired,
              ]}
            >
              {todo.deadline}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Acciones: editar y eliminar */}
      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => onEdit(todo)}
          >
            <MaterialIcons name="edit" size={20} color="#fbc02d" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <MaterialIcons name="delete" size={20} color="#d32f2f" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  text: {
    fontSize: 18,
    color: '#222',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
    fontStyle: 'italic',
  },
  deadlineContainer: {
    marginTop: 4,
  },
  deadlineLabel: {
    color: '#1976d2',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  deadlineText: {
    color: '#1976d2',
    fontSize: 14,
    marginTop: 2,
    marginLeft: 0,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 8,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deadlineExpired: {
  color: '#d32f2f',
  fontWeight: 'bold',
},
  toggleButton: {
    backgroundColor: '#e3f2fd',
  },
  completedButton: {
    backgroundColor: '#b2dfdb',
  },
  deleteButton: {
    backgroundColor: '#ffcdd2',
  },
  editButton: {
    backgroundColor: '#fff9c4',
  },
  actionText: {
    fontSize: 20,
  },
});
