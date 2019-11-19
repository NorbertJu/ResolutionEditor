import undoable, {groupByActionTypes} from 'redux-undo';
import {ADD_STEP,CHANGE_STEP,DELETE_STEP} from '../actions'

const steps = (state = [], action) => {
  switch (action.type) {
    case ADD_STEP:
      return [
        ...state,
        {
          id: action.id,
          text: action.text
        }
      ]

    case CHANGE_STEP:
      return state.map(step => {
        if (step.id === action.id) { 
          return {...step, text: action.text};
        }
        return step;
        });
        
    case DELETE_STEP:
      return state.filter(step => step.id !== action.id);

    default:
      return state
  }
}

const undoableSteps = undoable(steps, {
  groupBy: groupByActionTypes([CHANGE_STEP])
})

export default undoableSteps
