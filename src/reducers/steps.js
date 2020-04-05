import { ADD_STEP, CHANGE_STEP, DELETE_STEP, INSERT_STEP, STEP_UP, STEP_DOWN, CHANGE_RULE, CHANGE_RENAMING, CHANGE_REFERENCE1, CHANGE_REFERENCE2, CHANGE_UNIFIER, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED } from '../actions'
import { parseClause, parseSubstitution } from '@fmfi-uk-1-ain-412/js-fol-parser';
import { Variable, Constant, Function, Literal, Clause } from '../model/index'

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
          [action.id, {
            formula: {
              input: "",
              object: undefined,
              error: ""
            },
            rule: "",
            renaming: {
              input: "",
              object: undefined,
              error: ""
            },
            unifier: {
              input: "",
              object: undefined,
              error: ""
            },
            reference1: {
              input: "",
              object: undefined,
              error: ""
            },
            reference2: {
              input: "",
              object: undefined,
              error: ""
            }
          }]
        ]),
        rank: new Map([
          ...state.rank,
          [action.id, state.order.length]
        ])
      })

    case CHANGE_STEP: {
      let newState = {
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: {
              input: action.text,
              object: state.allSteps.get(action.id).formula.object,
              error: state.allSteps.get(action.id).formula.error
            },
            rule: state.allSteps.get(action.id).rule,
            renaming: state.allSteps.get(action.id).renaming,
            unifier: state.allSteps.get(action.id).unifier,
            reference1: state.allSteps.get(action.id).reference1,
            reference2: state.allSteps.get(action.id).reference2
          }]
        ]),
        order: state.order,
        rank: state.rank
      }
      newState.allSteps.get(action.id).formula.error = checkClause(language, action.text);
      return newState;
    }


    case CHANGE_RULE:
      return Object.assign({}, state, {
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: state.allSteps.get(action.id).formula,
            rule: action.text,
            renaming: state.allSteps.get(action.id).renaming,
            unifier: state.allSteps.get(action.id).unifier,
            reference1: state.allSteps.get(action.id).reference1,
            reference2: state.allSteps.get(action.id).reference2
          }]
        ])
      })

    case CHANGE_RENAMING: {
      let newState = {
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: state.allSteps.get(action.id).formula,
            rule: state.allSteps.get(action.id).rule,
            renaming: {
              input: action.text,
              object: state.allSteps.get(action.id).renaming.object,
              error: state.allSteps.get(action.id).renaming.error
            },
            unifier: state.allSteps.get(action.id).unifier,
            reference1: state.allSteps.get(action.id).reference1,
            reference2: state.allSteps.get(action.id).reference2
          }]
        ]),
        order: state.order,
        rank: state.rank
      }
      try {
        if (action.text !== "") {
          newState.allSteps.get(action.id).renaming.object = parseSubstitution(action.text, getSymbols(language), getFactories(language));
        }
        newState.allSteps.get(action.id).renaming.error = "";
      } catch (e) {
        newState.allSteps.get(action.id).renaming.error = e;
      }
      return newState;
    }

    case CHANGE_UNIFIER: {
      let newState = {
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: state.allSteps.get(action.id).formula,
            rule: state.allSteps.get(action.id).rule,
            renaming: state.allSteps.get(action.id).renaming,
            unifier: {
              input: action.text,
              object: state.allSteps.get(action.id).unifier.object,
              error: state.allSteps.get(action.id).unifier.error
            },
            reference1: state.allSteps.get(action.id).reference1,
            reference2: state.allSteps.get(action.id).reference2
          }]
        ]),
        order: state.order,
        rank: state.rank
      }
      try {
        if (action.text !== "") {
          newState.allSteps.get(action.id).unifier.object = parseSubstitution(action.text, getSymbols(language), getFactories(language));
        }
        newState.allSteps.get(action.id).unifier.error = "";
      } catch (e) {
        newState.allSteps.get(action.id).unifier.error = e;
      }
      return newState;
    }

    case CHANGE_REFERENCE1: {
      let newState = {
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: state.allSteps.get(action.id).formula,
            rule: state.allSteps.get(action.id).rule,
            renaming: state.allSteps.get(action.id).renaming,
            unifier: state.allSteps.get(action.id).unifier,
            reference1: {
              input: action.text,
              object: state.allSteps.get(action.id).reference1.object,
              error: state.allSteps.get(action.id).reference1.error
            },
            reference2: state.allSteps.get(action.id).reference2
          }]
        ]),
        order: state.order,
        rank: state.rank
      }
      if (action.text !== "") {
        if (newState.order.length < parseInt(action.text)) {
          newState.allSteps.get(action.id).reference1.error = {
            name: "IndexError",
            message: "Index out of range."
          };
        } else if (isNaN(parseInt(action.text))) {
          newState.allSteps.get(action.id).reference1.error = {
            name: "SyntaxError",
            message: "Expected number but \"" + action.text + "\" found."
          };
        } else {
          newState.allSteps.get(action.id).reference1.error = ""
        }
      } else {
        newState.allSteps.get(action.id).reference1.error = ""
      }

      return newState;
    }

    case CHANGE_REFERENCE2: {
      let newState = {
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: state.allSteps.get(action.id).formula,
            rule: state.allSteps.get(action.id).rule,
            renaming: state.allSteps.get(action.id).renaming,
            unifier: state.allSteps.get(action.id).unifier,
            reference1: state.allSteps.get(action.id).reference1,
            reference2: {
              input: action.text,
              object: state.allSteps.get(action.id).reference2.object,
              error: state.allSteps.get(action.id).reference2.error
            }
          }]
        ]),
        order: state.order,
        rank: state.rank
      }
      if (action.text !== "") {
        if (newState.order.length < parseInt(action.text)) {
          newState.allSteps.get(action.id).reference2.error = {
            name: "IndexError",
            message: "Index out of range."
          };
        } else if (isNaN(parseInt(action.text))) {
          newState.allSteps.get(action.id).reference2.error = {
            name: "SyntaxError",
            message: "Expected number but \"" + action.text + "\" found."
          };
        } else {
          newState.allSteps.get(action.id).reference2.error = ""
        }
      } else {
        newState.allSteps.get(action.id).reference2.error = ""
      }

      return newState;
    }
      return Object.assign({}, state, {
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: state.allSteps.get(action.id).formula,
            rule: state.allSteps.get(action.id).rule,
            renaming: state.allSteps.get(action.id).renaming,
            unifier: state.allSteps.get(action.id).unifier,
            reference1: state.allSteps.get(action.id).reference1,
            reference2: {
              input: action.text,
              object: state.allSteps.get(action.id).reference2.object,
              error: state.allSteps.get(action.id).reference2.error
            }
          }]
        ])
      })

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
      return Object.assign({}, state, {
        order: [
          ...state.order.filter(id => id !== action.id)
        ],
        allSteps: newSteps,
        rank: newRank,
      })

    case INSERT_STEP:
      return Object.assign({}, state, {
        order: [
          ...state.order.slice(0, action.position),
          action.id,
          ...state.order.slice(action.position)
        ],
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: {
              input: "",
              object: undefined,
              error: ""
            },
            rule: "",
            renaming: {
              input: "",
              object: undefined,
              error: ""
            },
            unifier: {
              input: "",
              object: undefined,
              error: ""
            },
            reference1: {
              input: "",
              object: undefined,
              error: ""
            },
            reference2: {
              input: "",
              object: undefined,
              error: ""
            }
          }]
        ]),
        rank: new Map([
          ...state.rank,
          [action.id, action.position]
        ])
      })

    case STEP_UP:
      newRank = new Map(state.rank);
      newRank.set(action.id, action.position - 1);
      newRank.set(state.rank.get(state.order[action.position - 1]), action.position);
      return Object.assign({}, state, {
        order: [
          ...state.order.slice(0, action.position - 1),
          state.order[action.position],
          state.order[action.position - 1],
          ...state.order.slice(action.position + 1)
        ],
        rank: newRank
      })

    case STEP_DOWN:
      newRank = new Map(state.rank);
      newRank.set(action.id, action.position + 1);
      newRank.set(state.rank.get(state.order[action.position + 1]), action.position);
      return Object.assign({}, state, {
        order: [
          ...state.order.slice(0, action.position),
          state.order[action.position + 1],
          state.order[action.position],
          ...state.order.slice(action.position + 2)
        ],
        rank: newRank
      })

    case CHANGE_CONST:
    case CHANGE_FUN:
    case CHANGE_PRED: {
      let newState = { ...state }
      newState.allSteps.forEach(function (value, key, map) {
        newState.allSteps.get(key).formula.error = checkClause(language, value.formula.input);
      })
      return newState
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
      checkArity(funSymbol, args, language.fun.object, ee);
      return new Function(funSymbol, args);
    },
    literal: (negated, predSymbol, args, ee) => {
      checkArity(predSymbol, args, language.pred.object, ee);
      return new Literal(negated, predSymbol, args);
    },
    clause: (literals, _) =>
      new Clause(literals)
  }
}

function getSymbols(language) {
  const nonLogicalSymbols = new Set([...language.const.object, ...language.fun.object.keys(), ...language.pred.object.keys()]);
  return {
    isConstant: (symbol) =>
      language.const.object.has(symbol),
    isFunction: (symbol) =>
      language.fun.object.has(symbol),
    isPredicate: (symbol) =>
      language.pred.object.has(symbol),
    isVariable: (symbol) =>
      !nonLogicalSymbols.has(symbol),
  }
}

function checkClause(language, input) {
  try {
    if (input !== "") {
      parseClause(input, getSymbols(language), getFactories(language));
    }
    return "";
  } catch (e) {
    return e;
  }
}

export default steps;