import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick, onTodoChange}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo} 
        onChange={() => onTodoChange(todo.id, "Dynamicky dopln hodnotu")}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
  onTodoChange: PropTypes.func.isRequired
}

export default TodoList
