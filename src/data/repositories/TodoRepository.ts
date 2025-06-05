import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../../core/entities/Todo';

const STORAGE_KEY = 'TODOS';

export const TodoRepository = {
  async getAll(): Promise<Todo[]> {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  },

  async saveAll(todos: Todo[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};
