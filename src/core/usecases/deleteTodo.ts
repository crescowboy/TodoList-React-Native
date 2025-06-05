import { Todo } from '../entities/Todo';

export const deleteTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.filter(todo => todo.id !== id);
};
