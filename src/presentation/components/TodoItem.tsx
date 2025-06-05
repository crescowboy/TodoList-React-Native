import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Todo } from '../../core/entities/Todo';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit?: (todo: Todo) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.textContainer} onPress={() => onToggle(todo.id)}>
        <Text style={[styles.text, todo.completed && styles.completed]}>
          {todo.text}
        </Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.toggleButton, todo.completed && styles.completedButton]}
          onPress={() => onToggle(todo.id)}
        >
          <Text style={styles.actionText}>{todo.completed ? '✔' : '○'}</Text>
        </TouchableOpacity>
        {onEdit && (
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => onEdit(todo)}
          >
            <Text style={styles.actionText}>✏️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(todo.id)}
        >
          <Text style={styles.actionText}>🗑️</Text>
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
