import undoable, {groupByActionTypes} from 'redux-undo';
import {ADD_STEP,CHANGE_STEP,DELETE_STEP,INSERT_STEP, STEP_UP, STEP_DOWN} from '../actions'

const steps = (state = [], action) => {
  switch (action.type) {
    case ADD_STEP:
      return [
        ...state,
        {
          id: action.id,
          text: ""
        }
      ];

    case CHANGE_STEP:
      return state.map(step => {
        if (step.id === action.id) { 
          return {...step, text: action.text};
        }
        return step;
      });
        
    case DELETE_STEP:
      return state.filter(step => step.id !== action.id);

    case INSERT_STEP:
      return [
        ...state.slice(0, action.position),
        {
          id: action.id,
          text: ""
        },
        ...state.slice(action.position)
      ];

    case STEP_UP:
      return [
        ...state.slice(0, action.position-1),
        state[action.position],
        state[action.position-1],
        ...state.slice(action.position+1)
      ];

    case STEP_DOWN:
      return [
        ...state.slice(0, action.position),
        state[action.position+1],
        state[action.position],
        ...state.slice(action.position+2)
      ];

    default:
      return state
  }
}

const undoableSteps = undoable(steps, {
  groupBy: groupByActionTypes([CHANGE_STEP])
})

export default undoableSteps
