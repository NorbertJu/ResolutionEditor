import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ text, onChange ,onClick }) => (
  <li>
    <input
      type="text"
      name="item"
      onChange={e => onChange(e.target.value)}
      value={text}/>
    <button onClick={onClick}>X</button>
  </li>
)


Todo.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo