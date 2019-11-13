import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick, onTodoChange}) => (
  <div style={{margin:'20px 0px'}}>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo} 
        onChange={(value) => onTodoChange(todo.id, value)}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </div>
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
