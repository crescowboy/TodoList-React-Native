import { Todo } from '../entities/Todo';

export const addTodo = (todos: Todo[], newTodo: Todo): Todo[] => {
  return [...todos, newTodo];
};
