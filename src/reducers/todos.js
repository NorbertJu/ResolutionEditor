import undoable, {groupByActionTypes} from 'redux-undo';
import {ADD_TODO,CHANGE_TODO,DELETE_TODO} from '../actions'

const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text
      }
    
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ]
    case CHANGE_TODO:
      return state.map(todo => {
        if (todo.id === action.id) { 
          return {...todo, text: action.text};
        }
        return todo;
        });
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);

    default:
      return state
  }
}

const undoableTodos = undoable(todos, {
  groupBy: groupByActionTypes([CHANGE_TODO])
})

export default undoableTodos
