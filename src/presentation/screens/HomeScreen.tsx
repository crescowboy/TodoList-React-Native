import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TodoItem from '../components/TodoItem';
import { Todo } from '../../core/entities/Todo';
import { TodoStorage } from '../../infrastructure/storage/TodoStorage';
import { addTodo, deleteTodo, toggleTodo } from '../../core/usecases/';
import TodoFilterBar from '../components/TodoFilterBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }: any) {
  const [todos, setTodos] = useState<Todo[]>([]);
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
  };

  const handleUpdate = (updatedTodo: Todo) => {
    const updated = todos.map(t => t.id === updatedTodo.id ? updatedTodo : t);
    setTodos(updated);
    TodoStorage.saveTodos(updated);
  };

  const handleFabPress = () => {
    navigation.navigate('AddTodo', { handleAdd });
  };

  const getFilteredTodos = () => {
    let filtered = todos;
    if (filter === 'completed') { filtered = todos.filter(t => t.completed); }
    if (filter === 'pending') { filtered = todos.filter(t => !t.completed); }

    return filtered.slice().sort((a, b) => {
      if (a.deadline && b.deadline) {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      if (a.deadline) { return -1; }
      if (b.deadline) { return 1; }
      return 0;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="checklist" size={28} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>Mis Tareas!</Text>
        </View>
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
            onEdit={(todo) =>
              navigation.navigate('AddTodo', {
                todoToEdit: todo,
                handleUpdate,
              })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>¡No tienes tareas aún!</Text>
          </View>
        }
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={handleFabPress}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>＋ Agregar</Text>
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
    right: 20,
    bottom: 30,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
