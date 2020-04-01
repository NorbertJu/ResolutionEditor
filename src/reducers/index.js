import undoable, { groupByActionTypes } from 'redux-undo';
import { ADD_STEP, CHANGE_STEP, DELETE_STEP, INSERT_STEP, STEP_UP, STEP_DOWN, CHANGE_RULE, CHANGE_RENAMING, CHANGE_REFERENCE, CHANGE_UNIFIER, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED, EMPTY_ACTION } from '../actions'
import steps from './steps'
import language from './language'

const initialCombinedState = {
  language: language(),
  steps: steps()
};

function app(state = initialCombinedState, action) {
  switch (action.type) {
    case CHANGE_CONST:
    case CHANGE_FUN:
    case CHANGE_PRED: {
      const languageState = language(state.language, action);
      const stepsState = steps(state.steps, action, languageState);
      return { language: languageState, steps: stepsState };
    }
    case ADD_STEP:
    case CHANGE_STEP:
    case DELETE_STEP:
    case INSERT_STEP:
    case STEP_UP:
    case STEP_DOWN:
    case CHANGE_RULE:
    case CHANGE_REFERENCE:
    case CHANGE_RENAMING:
    case CHANGE_UNIFIER: {
      const stepsState = steps(state.steps, action, state.language);
      return { language: state.language, steps: stepsState }
    }
    case EMPTY_ACTION: {
      return {...state};
    }
    default:
      return state;
  }
}

const undoableState = undoable(app, {
  groupBy: groupByActionTypes([CHANGE_STEP]),
})

export default undoableState;