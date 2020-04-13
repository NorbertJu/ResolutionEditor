import { ADD_STEP, CHANGE_STEP, DELETE_STEP, INSERT_STEP, STEP_UP, STEP_DOWN, CHANGE_RULE, CHANGE_RENAMING, CHANGE_REFERENCE1, CHANGE_REFERENCE2, CHANGE_UNIFIER, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED } from '../actions'
import { parseClause, parseSubstitution } from '@fmfi-uk-1-ain-412/js-fol-parser';
import { Variable, Constant, Function, Literal, Clause } from '../model/index'

const newStep = {
  formula: {
    input: "",
    object: undefined,
    error: ""
  },
  rule: "",
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
  }
};

const steps = (state = { order: [], allSteps: new Map(), rank: new Map() }, action = { type: undefined }, language) => {
  console.log(state);
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
      return {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id, {
          ...state.allSteps.get(action.id),
          formula
        }]
        ])
      }
    }

    case CHANGE_RULE: {
      return {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id, {
          ...state.allSteps.get(action.id),
          rule: action.text
        }]
        ])
      }
    }

    case CHANGE_RENAMING: {
      let renaming = {
        ...state.allSteps.get(action.id).renaming,
        input: action.text,
        error: ""
      };
      try {
        renaming.object = parseSubstitution(action.text, getSymbols(language), getFactories(language));
      } catch (e) {
        renaming.error = e;
      }
      return {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id, {
          ...state.allSteps.get(action.id),
          renaming
        }]
        ])
      }
    }

    case CHANGE_UNIFIER: {
      let unifier = {
        ...state.allSteps.get(action.id).unifier,
        input: action.text,
        error: ""
      };
      try {
        unifier.object = parseSubstitution(action.text, getSymbols(language), getFactories(language));
      } catch (e) {
        unifier.error = e;
      }
      return {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id, {
          ...state.allSteps.get(action.id),
          unifier
        }]
        ])
      }
    }

    case CHANGE_REFERENCE1: {
      let reference1 = {
        ...state.allSteps.get(action.id).reference1,
        input: action.text,
        error: ""
      };
      if (action.text !== "") {
        if (state.order.length <= parseInt(action.text) || parseInt(action.text) < 1) {
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
          reference1.error = ""
        }
      } else {
        reference1.error = ""
      }
      return {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id, {
          ...state.allSteps.get(action.id),
          reference1
        }]
        ])
      }
    }

    case CHANGE_REFERENCE2: {
      let reference2 = {
        ...state.allSteps.get(action.id).reference2,
        input: action.text,
        error: ""
      };
      if (action.text !== "") {
        if (state.order.length <= parseInt(action.text) || parseInt(action.text) < 1) {
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
          reference2.error = ""
        }
      } else {
        reference2.error = ""
      }
      return {
        ...state,
        allSteps: new Map([...state.allSteps,
        [action.id, {
          ...state.allSteps.get(action.id),
          reference2
        }]
        ])
      }
    }

    case DELETE_STEP:
      let delOrder = state.rank.get(action.id);
      let newSteps = new Map(state.allSteps);
      newSteps.delete(action.id);
      let newRank = new Map(state.rank);
      newRank.delete(action.id);
      for (var [key, value] of newRank.entries()) {
        if (value > delOrder) {
          newRank.set(key, value - 1)
        }
      }
      return {...state,
        order: [
          ...state.order.filter(id => id !== action.id)
        ],
        allSteps: newSteps,
        rank: newRank,
      };

    case INSERT_STEP: {
      return {...state,
        order: [
          ...state.order.slice(0, action.position),
          action.id,
          ...state.order.slice(action.position)
        ],
        allSteps: new Map([
          ...state.allSteps,
          [action.id, newStep]
        ]),
        rank: new Map([
          ...state.rank,
          [action.id, action.position]
        ])
      }
    }

    case STEP_UP: {
      let newRank = new Map(state.rank);
      newRank.set(action.id, action.position - 1);
      newRank.set(state.rank.get(state.order[action.position - 1]), action.position);
      return {...state,
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
      let newRank = new Map(state.rank);
      newRank.set(action.id, action.position + 1);
      newRank.set(state.rank.get(state.order[action.position + 1]), action.position);
      return {...state,
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
      let newAllSteps = new Map([...state.allSteps]);
      state.allSteps.forEach(function (value, key, map) {
        let formula = {
          ...state.allSteps.get(key).formula,
          error: ""
        };
        try {
          formula.object = parseClause(value.formula.input, getSymbols(language), getFactories(language));
        } catch (e) {
          formula.error = e;
        }
        newAllSteps = new Map ([...newAllSteps,
          [key, {
            ...state.allSteps.get(key),
            formula
          }]
        ]);
      })
      return {
        ...state,
        allSteps: newAllSteps
      }
    }

    default:
      return state
  }
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