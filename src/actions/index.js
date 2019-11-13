export const ADD_TODO = 'ADD_TODO';
export const CHANGE_TODO = 'CHANGE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

let nextTodoId = 0

export const addTodo = (text) => ({
  type: ADD_TODO,
  id: nextTodoId++,
  text
})

export const changeTodo = (id, text) => ({
  type: CHANGE_TODO,
  id,
  text
})

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  id
})