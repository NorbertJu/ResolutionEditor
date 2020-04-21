import { ADD_STEP, CHANGE_STEP, DELETE_STEP, INSERT_STEP, STEP_UP, STEP_DOWN, CHANGE_RULE, CHANGE_RENAMING, CHANGE_REFERENCE1, CHANGE_REFERENCE2, CHANGE_UNIFIER, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED } from '../actions'
import { parseClause, parseSubstitution } from '@fmfi-uk-1-ain-412/js-fol-parser';
import { Variable, Constant, Function, Literal, Clause } from '../model/index'

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
      let formula = {
        ...state.allSteps.get(action.id).formula,
        input: action.text,
        error: ""
      };
      try {
        formula.object = parseClause(action.text, getSymbols(language), getFactories(language));
      } catch (e) {
        formula.error = e;
      }
      let newState = {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id,
          validateStep({
            ...state.allSteps.get(action.id),
            formula
          }, state)]
        ])
      }
      return newState;
    }

    case CHANGE_RULE: {
      let newState = {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id, 
          validateStep({
            ...state.allSteps.get(action.id),
            rule: action.text
          }, state)]
        ])
      };
      return newState;
    }

    case CHANGE_RENAMING: {
      let renaming = {
        ...state.allSteps.get(action.id).renaming,
        input: action.text,
        error: ""
      };
      try {
        if (action.text !== "") {
          renaming.object = new Map(parseSubstitution(action.text, getSymbols(language), getFactories(language)));
          for (const [key, value] of renaming.object) {
            console.log(value);
            if (!(value instanceof Variable)) {
              renaming.error = {
                name: "TypeError",
                message: "\""+key+"\" is renamed to \""+ value+"\", which is not a variable"
              }
            }
          }
        } else {
          renaming.object = undefined;
        }
      } catch (e) {
        renaming.error = e;
      }
      let newState = {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id, 
          validateStep({
            ...state.allSteps.get(action.id),
            renaming
          }, state)]
        ])
      }
      return newState;
    }

    case CHANGE_UNIFIER: {
      let unifier = {
        ...state.allSteps.get(action.id).unifier,
        input: action.text,
        error: ""
      };
      try {
        if (action.text !== "") {
          unifier.object = new Map(parseSubstitution(action.text, getSymbols(language), getFactories(language)));
        } else {
          unifier.object = undefined;
        }
      } catch (e) {
        unifier.error = e;
      }
      let newState = {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id, 
          validateStep ({
            ...state.allSteps.get(action.id),
            unifier
          }, state)]
        ])
      }
      return newState;
    }

    case CHANGE_REFERENCE1: {
      let reference1 = {
        ...state.allSteps.get(action.id).reference1,
        input: action.text,
        error: ""
      };
      if (action.text !== "") {
        if (state.rank.get(action.id) < parseInt(action.text) || parseInt(action.text) < 1) {
          reference1.error = {
            name: "IndexError",
            message: "Index out of range."
          };
        } else if (isNaN(parseInt(action.text))) {
          reference1.error = {
            name: "SyntaxError",
            message: "Expected number but \"" + action.text + "\" found."
          };
        } else {
          reference1.object = parseInt(action.text) - 1;
          reference1.error = ""
        }
      } else {
        reference1.object = parseInt(action.text) - 1;
        reference1.error = ""
      }
      let newState = {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id, 
          validateStep({
            ...state.allSteps.get(action.id),
            reference1
          }, state)]
        ])
      }
      return newState;
    }

    case CHANGE_REFERENCE2: {
      let reference2 = {
        ...state.allSteps.get(action.id).reference2,
        input: action.text,
        error: ""
      };
      if (action.text !== "") {
        if (state.rank.get(action.id) < parseInt(action.text) || parseInt(action.text) < 1) {
          reference2.error = {
            name: "IndexError",
            message: "Index out of range."
          };
        } else if (isNaN(parseInt(action.text))) {
          reference2.error = {
            name: "SyntaxError",
            message: "Expected number but \"" + action.text + "\" found."
          };
        } else {
          reference2.object = parseInt(action.text) - 1;
          reference2.error = ""
        }
      } else {
        reference2.object = parseInt(action.text) - 1;
        reference2.error = ""
      }
      let newState = {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id, 
          validateStep({
            ...state.allSteps.get(action.id),
            reference2
          }, state)]
        ])
      }
      return newState;
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
      const allSteps = new Map();
      state.allSteps.forEach((step, id) => {
        let object = step.formula.object;
        let error = "";
        try {
          object = parseClause(step.formula.input,
            getSymbols(language), getFactories(language));
        } catch (e) {
          error = e;
        }
        allSteps.set(id,
          {
            ...step,
            formula: { ...step.formula, object, error }
          }
        );
      });
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
      return {...step};
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

function getFactories(language) {
  function checkArity(symbol, args, arityMap, { expected }) {
    const a = arityMap.get(symbol);
    if (args.length !== a) {
      expected(`${a} argument${(a == 1 ? '' : 's')} to ${symbol}`);
    }
  }
  return {
    variable: (symbol, _) =>
      new Variable(symbol),
    constant: (symbol, _) =>
      new Constant(symbol),
    functionApplication: (funSymbol, args, ee) => {
      checkArity(funSymbol, args, language.funs.object, ee);
      return new Function(funSymbol, args);
    },
    literal: (negated, predSymbol, args, ee) => {
      checkArity(predSymbol, args, language.preds.object, ee);
      return new Literal(negated, predSymbol, args);
    },
    clause: (literals, _) =>
      new Clause(literals)
  }
}

function getSymbols(language) {
  const nonLogicalSymbols = new Set([...language.consts.object, ...language.funs.object.keys(), ...language.preds.object.keys()]);
  return {
    isConstant: (symbol) =>
      language.consts.object.has(symbol),
    isFunction: (symbol) =>
      language.funs.object.has(symbol),
    isPredicate: (symbol) =>
      language.preds.object.has(symbol),
    isVariable: (symbol) =>
      !nonLogicalSymbols.has(symbol),
  }
}

export default steps;