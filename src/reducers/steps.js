import { ADD_STEP, CHANGE_STEP, DELETE_STEP, INSERT_STEP, STEP_UP, STEP_DOWN, CHANGE_RULE, CHANGE_RENAMING, CHANGE_REFERENCE, CHANGE_UNIFIER, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED } from '../actions'
import { parseClause } from '@fmfi-uk-1-ain-412/js-fol-parser';
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
            reference: {
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

    case CHANGE_STEP:
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
            reference: state.allSteps.get(action.id).reference
          }]
        ]),
        order: state.order,
        rank: state.rank
      }
      try {
        const nonLogicalSymbols = new Set([...language.const.object, ...language.fun.object.keys(), ...language.pred.object.keys()]);
        const languageSymbols = {
          isConstant: (symbol) =>
            language.const.object.has(symbol),
          isFunction: (symbol) =>
            language.fun.object.has(symbol),
          isPredicate: (symbol) =>
            language.pred.object.has(symbol),
          isVariable: (symbol) =>
            !nonLogicalSymbols.has(symbol),
        }
        function checkArity(symbol, args, arityMap, { expected }) {
          const a = arityMap.get(symbol);
          if (args.length !== a) {
            expected(`${a} argument${(a == 1 ? '' : 's')} to ${symbol}`);
          }
        }
        const factories = {
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
        if (action.text !== "") {
          parseClause(action.text, languageSymbols, factories);
        }
        newState.allSteps.get(action.id).formula.error = "";
      } catch (e) {
        newState.allSteps.get(action.id).formula.error = "<b>" + action.text.substring(0, e.location.start.offset) + "<mark class='text-danger'>" +
          action.text.substring(e.location.start.offset, e.location.end.offset) + "</mark>" +
          action.text.substring(e.location.end.offset, action.text.length) + "</b><br/>" +
          e.name + ": " + e.message;
      }
      return newState

    case CHANGE_RULE:
      return Object.assign({}, state, {
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: state.allSteps.get(action.id).formula,
            rule: action.text,
            renaming: state.allSteps.get(action.id).renaming,
            unifier: state.allSteps.get(action.id).unifier,
            reference: state.allSteps.get(action.id).reference
          }]
        ])
      })

    case CHANGE_RENAMING:
      return Object.assign({}, state, {
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
            reference: state.allSteps.get(action.id).reference
          }]
        ])
      })

    case CHANGE_UNIFIER:
      return Object.assign({}, state, {
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
            reference: state.allSteps.get(action.id).reference
          }]
        ])
      })

    case CHANGE_REFERENCE:
      return Object.assign({}, state, {
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: state.allSteps.get(action.id).formula,
            rule: state.allSteps.get(action.id).rule,
            renaming: state.allSteps.get(action.id).renaming,
            unifier: state.allSteps.get(action.id).unifier,
            reference: {
              input: action.text,
              object: state.allSteps.get(action.id).reference.object,
              error: state.allSteps.get(action.id).reference.error
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
            reference: {
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

    default:
      return state
  }
}

export default steps;