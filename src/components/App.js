import React from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import UndoRedo from '../containers/UndoRedo'

const App = () => (
  <div>
    <UndoRedo />
    <VisibleTodoList />
    <AddTodo />
  </div>
)

export default App
