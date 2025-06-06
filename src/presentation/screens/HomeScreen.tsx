import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import TodoItem from '../components/TodoItem';
import { Todo } from '../../core/entities/Todo';
import { TodoStorage } from '../../infrastructure/storage/TodoStorage';
import { addTodo, deleteTodo, editTodo, toggleTodo } from '../../core/usecases/';
import TodoFilterBar from '../components/TodoFilterBar';

export default function HomeScreen({ navigation }: any) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    TodoStorage.getTodos().then(setTodos);
  }, []);

  const handleAdd = (todo: Todo) => {
    const updated = addTodo(todos, todo);
    setTodos(updated);
    TodoStorage.saveTodos(updated);
  };

  const handleToggle = (id: number) => {
    const updated = toggleTodo(todos, id);
    setTodos(updated);
    TodoStorage.saveTodos(updated);
  };

  const handleDelete = (id: number) => {
    const updated = deleteTodo(todos, id);
    setTodos(updated);
    TodoStorage.saveTodos(updated);
    if (editingId === id) {
      setEditingId(null);
      setInput('');
    }
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setInput(todo.text);
  };

  const handleEditSave = () => {
    if (editingId !== null && input.trim()) {
      const updated = editTodo(todos, editingId, input.trim());
      setTodos(updated);
      TodoStorage.saveTodos(updated);
      setEditingId(null);
      setInput('');
      Keyboard.dismiss();
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setInput('');
    Keyboard.dismiss();
  };

  const handleFabPress = () => {
    if (editingId !== null) {
      handleEditSave();
    } else {
      navigation.navigate('AddTodo', { handleAdd });
    }
  };

  const getFilteredTodos = () => {
  let filtered = todos;
  if (filter === 'completed') {filtered = todos.filter(t => t.completed);}
  if (filter === 'pending') {filtered = todos.filter(t => !t.completed);}

  return filtered.slice().sort((a, b) => {
    if (a.deadline && b.deadline) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    if (a.deadline) {return -1;}
    if (b.deadline) {return 1;}
    return 0;
  });
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📝 Mis Tareas</Text>
      </View>

      <TodoFilterBar filter={filter} setFilter={setFilter} />

      <FlatList
        data={getFilteredTodos()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleStartEdit}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>¡No tienes tareas aún!</Text>
        }
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
      />

      {editingId !== null && (
        <View style={styles.editBar}>
          <TextInput
            style={styles.editInput}
            value={input}
            onChangeText={setInput}
            placeholder="Editar tarea..."
            placeholderTextColor="#888"
            autoFocus
            onSubmitEditing={handleEditSave}
          />
          <TouchableOpacity style={styles.saveBtn} onPress={handleEditSave} disabled={!input.trim()}>
            <Text style={styles.saveBtnText}>✓</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={handleEditCancel}>
            <Text style={styles.cancelBtnText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[styles.fab, editingId !== null && styles.fabEdit]}
        onPress={handleFabPress}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>{editingId !== null ? '✓' : '＋'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fc' },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#1976d2',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#e3eafc',
    marginHorizontal: 4,
  },
  filterBtnActive: {
    backgroundColor: '#1976d2',
  },
  filterText: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#fff',
  },
  separator: {
    height: 8,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#1976d2',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
    marginTop: 40,
  },
  editBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 32 + 70,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  editInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    backgroundColor: '#f9f9f9',
    marginRight: 8,
    color: '#222',
  },
  saveBtn: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    padding: 10,
    marginRight: 4,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cancelBtn: {
    backgroundColor: '#ffcdd2',
    borderRadius: 8,
    padding: 10,
  },
  cancelBtnText: {
    color: '#d11a2a',
    fontSize: 20,
    fontWeight: 'bold',
  },
  fabEdit: {
    backgroundColor: '#388e3c',
  },
});
