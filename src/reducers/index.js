import undoable from 'redux-undo';
import { ADD_STEP, CHANGE_STEP, DELETE_STEP, INSERT_STEP, STEP_UP, STEP_DOWN, CHANGE_RULE, CHANGE_RENAMING, CHANGE_REFERENCE1, CHANGE_REFERENCE2, CHANGE_UNIFIER, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED, INPUT_FOCUS, INPUT_BLUR, EXPORT_STATE, IMPORT_STATE, nextStepId, setId } from '../actions'
import steps from './steps'
import language from './language'

const initialCombinedState = {
  language: language(),
  steps: steps(),
  inputChange: { originValue: "" }
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
      return { ...state, inputChange: { originValue: action.text } }
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
    case EXPORT_STATE: {
      let link = document.createElement('a');
      link.setAttribute("download", "resolution_state");
      let stateCopy = {
        ...state, 
        language: {
          ...state.language,
          consts: {
            ...state.language.consts,
            object: Array.from(state.language.consts.object)
          },
          funs: {
            ...state.language.funs,
            object: Array.from(state.language.funs.object.entries())
          },
          preds: {
            ...state.language.preds,
            object: Array.from(state.language.preds.object.entries())
          }
        },
        steps: {
          ...state.steps,
          allSteps: Array.from(state.steps.allSteps.entries()),
          rank: Array.from(state.steps.rank.entries())
        }
      }
      let data = new Blob([JSON.stringify({state: stateCopy, id: nextStepId})], {type: 'text/plain'});
      let url = window.URL.createObjectURL(data);
      link.href = url;
      link.click();
      return state;
    }
    case IMPORT_STATE: {
      let data = JSON.parse(action.data);
      let state = data.state
      setId(data.id);
      state.steps.allSteps = new Map(state.steps.allSteps);
      state.steps.rank = new Map(state.steps.rank);
      state.language.consts.object = new Set(state.language.consts.object);
      state.language.funs.object = new Map(state.language.funs.object);
      state.language.preds.object = new Map(state.language.preds.object);
      state.steps = steps(state.steps, action, state.language);
      return state;
    }
    default: {
      return state;
    }

  }
}

const undoableState = undoable(app, {
  filter: function filterActions(action, currentState, previousHistory) {
    switch (action.type) {
      case CHANGE_STEP:
      case CHANGE_CONST:
      case CHANGE_FUN:
      case CHANGE_PRED:
      case CHANGE_REFERENCE1:
      case CHANGE_REFERENCE2:
      case CHANGE_RENAMING:
      case CHANGE_UNIFIER:
      case INPUT_FOCUS: {
        return false
      }

      case INPUT_BLUR: {
        if (action.text !== currentState.inputChange.originValue) {
          return true;
        } else {
          return false;
        }
      }

      default:
        return true;
    }
  }
})

export default undoableState;