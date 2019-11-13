import { connect } from 'react-redux'
import { deleteTodo, changeTodo } from '../actions'
import TodoList from '../components/TodoList'

const mapStateToProps = (state) => ({
  todos: state.todos.present
})

const mapDispatchToProps = ({
  onTodoClick: deleteTodo,
  onTodoChange: changeTodo
})

const ActualTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default ActualTodoList
