let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const changeTodo = (id, text) => ({
  type: 'CHANGE_TODO',
  id,
  text
})

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  id
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})


