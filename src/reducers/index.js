import undoable, { newHistory } from 'redux-undo';
import { ADD_STEP, CHANGE_STEP, DELETE_STEP, INSERT_STEP, STEP_UP, STEP_DOWN, CHANGE_RULE, CHANGE_RENAMING, CHANGE_REFERENCE1, CHANGE_REFERENCE2, CHANGE_UNIFIER, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED, INPUT_FOCUS, INPUT_BLUR, EXPORT_STATE, IMPORT_STATE } from '../actions'
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
      link.setAttribute("download", "resolutionProof");
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
      let data = new Blob([JSON.stringify(stateCopy)], { type: 'application/json' });
      let url = window.URL.createObjectURL(data);
      link.href = url;
      link.click();
      return state;
    }
    case IMPORT_STATE: {
      let state = JSON.parse(action.data);
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

export function importState(stringData) {
  let present = JSON.parse(stringData);
  present.steps.allSteps = new Map(present.steps.allSteps);
  present.steps.rank = new Map(present.steps.rank);
  present.language.consts.object = new Set(present.language.consts.object);
  present.language.funs.object = new Map(present.language.funs.object);
  present.language.preds.object = new Map(present.language.preds.object);
  present.steps = steps(present.steps, {type: IMPORT_STATE}, present.language);
  let newState = newHistory([], present, []);
  return newState;
}

export function exportState(originState) {
  return JSON.stringify({
    ...originState.present,
    language: {
      ...originState.present.language,
      consts: {
        ...originState.present.language.consts,
        object: Array.from(originState.present.language.consts.object)
      },
      funs: {
        ...originState.present.language.funs,
        object: Array.from(originState.present.language.funs.object.entries())
      },
      preds: {
        ...originState.present.language.preds,
        object: Array.from(originState.present.language.preds.object.entries())
      }
    },
    steps: {
      ...originState.present.steps,
      allSteps: Array.from(originState.present.steps.allSteps.entries()),
      rank: Array.from(originState.present.steps.rank.entries())
    }
  });
}

export default undoableState;