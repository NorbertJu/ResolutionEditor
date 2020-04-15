import undoable, { groupByActionTypes, excludeAction } from 'redux-undo';
import { ADD_STEP, CHANGE_STEP, DELETE_STEP, INSERT_STEP, STEP_UP, STEP_DOWN, CHANGE_RULE, CHANGE_RENAMING, CHANGE_REFERENCE1, CHANGE_REFERENCE2, CHANGE_UNIFIER, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED, INPUT_FOCUS, INPUT_BLUR } from '../actions'
import steps from './steps'
import language from './language'

const initialCombinedState = {
  language: language(),
  steps: steps(),
  inputChange: {originValue: ""}
};

function app(state = initialCombinedState, action) {
  switch (action.type) {
    case CHANGE_CONST:
    case CHANGE_FUN:
    case CHANGE_PRED: {
      const languageState = language(state.language, action);
      const stepsState = steps(state.steps, action, languageState);
      return { ...state, language: languageState, steps: stepsState };
    }
    case INPUT_FOCUS: {
      return { ...state, inputChange: {originValue: action.text}}
    }
    case ADD_STEP:
    case CHANGE_STEP:
    case DELETE_STEP:
    case INSERT_STEP:
    case STEP_UP:
    case STEP_DOWN:
    case CHANGE_RULE:
    case CHANGE_REFERENCE1:
    case CHANGE_REFERENCE2:
    case CHANGE_RENAMING:
    case CHANGE_UNIFIER: {
      const stepsState = steps(state.steps, action, state.language);
      return { ...state, language: state.language, steps: stepsState }
    }
    default: {
      return state;
    }
      
  }
}

const undoableState = undoable(app, {
  filter: function filterActions(action, currentState, previousHistory) {
    if ([CHANGE_STEP, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED, CHANGE_RULE,CHANGE_REFERENCE1,
      CHANGE_REFERENCE2, CHANGE_RENAMING, CHANGE_UNIFIER, INPUT_FOCUS].includes(action.type)) {
        return false;
      }
    if (action.type === INPUT_BLUR && action.text === currentState.inputChange.originValue) {
      return false;
    }
    return true;
  }
})

export default undoableState;