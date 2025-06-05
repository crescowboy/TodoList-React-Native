import { TodoRepository } from '../../data/repositories/TodoRepository';

export const TodoStorage = {
  getTodos: TodoRepository.getAll,
  saveTodos: TodoRepository.saveAll,
};
