import React from 'react'
import AddTodo from '../containers/AddTodo'
import ActualTodoList from '../containers/ActualTodoList'
import UndoRedo from '../containers/UndoRedo'

const App = () => (
  <div>
    <UndoRedo />
    <ActualTodoList />
    <AddTodo />
  </div>
)

export default App
