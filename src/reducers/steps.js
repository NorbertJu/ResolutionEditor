import { ADD_STEP, CHANGE_STEP, DELETE_STEP, INSERT_STEP, STEP_UP, STEP_DOWN, CHANGE_RULE, CHANGE_RENAMING, CHANGE_REFERENCE1, CHANGE_REFERENCE2, CHANGE_UNIFIER, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED } from '../actions'
import { parseClause, parseSubstitution } from '@fmfi-uk-1-ain-412/js-fol-parser';
import { Variable, Constant, Function, Literal, Clause } from '../model/index'
import step from './step'

const newStep = {
  formula: {
    input: "",
    object: undefined,
    error: ""
  },
  rule: "Assumption",
  reference1: {
    input: "",
    object: undefined,
    error: ""
  },
  renaming: {
    input: "",
    object: undefined,
    error: ""
  },
  reference2: {
    input: "",
    object: undefined,
    error: ""
  },
  unifier: {
    input: "",
    object: undefined,
    error: ""
  },
  valid: false
};

const steps = (state = { order: [], allSteps: new Map(), rank: new Map() }, action = { type: undefined }, language) => {
  switch (action.type) {
    case ADD_STEP:
      return Object.assign({}, state, {
        order: [
          ...state.order,
          action.id,
        ],
        allSteps: new Map([
          ...state.allSteps,
          [action.id, newStep]
        ]),
        rank: new Map([
          ...state.rank,
          [action.id, state.order.length]
        ])
      })

    case CHANGE_STEP: {
      const allSteps = new Map(state.allSteps);
      let from = state.rank.get(action.id);
      let checked = new Set();
      for (let i = from; i < state.order.length; i++) {
        let id = state.order[i];
        let s = allSteps.get(id);
        if (i === from) {
          checked.add(i);
          allSteps.set(id, validateStep(
            step(s, action, state, language),
            state
          ));
        }
        else if (s.rule === "Factoring" && checked.has(s.reference2.object) ||
        s.rule === "Resolution" && (checked.has(s.reference2.object) || checked.has(s.reference1.object))) {
          checked.add(i);
          action.check = true;
          allSteps.set(id, validateStep(
            step(s, action, state, language),
            { ...state, allSteps }
          ));
        }
      }
      return { ...state, allSteps };
    }

    case CHANGE_RULE:
    case CHANGE_RENAMING:
    case CHANGE_UNIFIER:
    case CHANGE_REFERENCE1:
    case CHANGE_REFERENCE2: {
      return {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id,
        validateStep(step(state.allSteps.get(action.id), action, state, language), state)]
        ])
      };
    }

    case DELETE_STEP: {
      let delOrder = state.rank.get(action.id);
      let newSteps = new Map([...state.allSteps]);
      newSteps.delete(action.id);
      let newRank = new Map([...state.rank]);
      newRank.delete(action.id);
      for (let [key, value] of newRank.entries()) {
        if (value > delOrder) {
          newRank.set(key, value - 1)
        }
      }
      return {
        ...state,
        order: [
          ...state.order.filter(id => id !== action.id)
        ],
        allSteps: newSteps,
        rank: newRank,
      };
    }

    case INSERT_STEP: {
      let newRank = new Map([...state.rank]);
      for (let [key, value] of newRank.entries()) {
        if (value >= action.position) {
          newRank.set(key, value + 1)
        }
      }
      newRank.set(action.id, action.position);
      return {
        ...state,
        order: [
          ...state.order.slice(0, action.position),
          action.id,
          ...state.order.slice(action.position)
        ],
        allSteps: new Map([
          ...state.allSteps,
          [action.id, newStep]
        ]),
        rank: newRank
      }
    }

    case STEP_UP: {
      let newRank = new Map([...state.rank]);
      newRank.set(state.order[action.position], action.position - 1);
      newRank.set(state.order[action.position - 1], action.position);
      return {
        ...state,
        order: [
          ...state.order.slice(0, action.position - 1),
          state.order[action.position],
          state.order[action.position - 1],
          ...state.order.slice(action.position + 1)
        ],
        rank: newRank
      }
    }

    case STEP_DOWN: {
      let newRank = new Map([...state.rank]);
      newRank.set(state.order[action.position], action.position + 1);
      newRank.set(state.order[action.position + 1], action.position);
      return {
        ...state,
        order: [
          ...state.order.slice(0, action.position),
          state.order[action.position + 1],
          state.order[action.position],
          ...state.order.slice(action.position + 2)
        ],
        rank: newRank
      }
    }

    case CHANGE_CONST:
    case CHANGE_FUN:
    case CHANGE_PRED: {
      const allSteps = new Map(state.allSteps);
      for (let id of state.order) {
        allSteps.set(id, validateStep(
          step(allSteps.get(id), action, state, language),
          { ...state, allSteps }
        ));
      }
      return { ...state, allSteps };
    }

    default:
      return state
  }
}

function validateStep(step, state) {
  switch (step.rule) {
    case "Factoring": {
      if (!validReference(step.reference2)) {
        return { ...step, valid: false };
      }
      const premise = getPremise(step.reference2.object, state);
      if (!premise || !validFormula(step.formula)) {
        return { ...step, valid: false };
      }

      if (step.formula.object.isFactorOf(premise.formula.object, step.unifier.object)) {
        return { ...step, valid: true, formula: { ...step.formula, error: "" } };
      } else {
        return {
          ...step, valid: false, formula: {
            ...step.formula, error: {
              name: "LogicError",
              message: "This clause is not valid factor of clause " + step.reference2.input
            }
          }
        };
      }
    }

    case "Resolution": {
      if (!validReference(step.reference2) || !validReference(step.reference1)) {
        return { ...step, valid: false };
      }
      const premise1 = getPremise(step.reference1.object, state);
      const premise2 = getPremise(step.reference2.object, state);
      if (!premise1 || !premise2 || !validFormula(step.formula)) {
        return { ...step, valid: false };
      }
      if (step.formula.object.isResolventOf(premise1.formula.object, premise2.formula.object, step.renaming.object, step.unifier.object)) {
        return { ...step, valid: true, formula: { ...step.formula, error: "" } };
      } else {
        return {
          ...step, valid: false, formula: {
            ...step.formula, error: {
              name: "LogicError",
              message: "Clause is not valid resolvent of clauses " + step.reference1.input + " and " + step.reference2.input
            }
          }
        };
      }
    }

    case "Assumption": {
      if (!validFormula(step.formula)) {
        return { ...step, valid: false };
      }
      return { ...step, valid: true };
    }

    default:
      return { ...step };
  }
}

function validFormula(formula) {
  return formula.object !== undefined && (formula.error === "" || formula.error.name === "LogicError")
}

function validReference(reference) {
  return reference.error === "" && reference.input !== ""
}

function getPremise(reference, state) {
  const premise = state.allSteps.get(state.order[parseInt(reference)]);
  if (premise.valid) {
    return premise;
  }
  return null;
}

export default steps;