import undoable, {groupByActionTypes} from 'redux-undo';
import {ADD_STEP,CHANGE_STEP,DELETE_STEP,INSERT_STEP, STEP_UP, STEP_DOWN, CHANGE_RULE, CHANGE_PARAMS, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED} from '../actions'

const steps = (state = {language: {constants: "", functions: "", predicates: ""},order: [], allSteps: new Map(), rank: new Map()}, action) => {
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
            formula: "",
            rule: "",
            params: ""
          }]
        ]),
        rank: new Map([
          ...state.rank,
          [action.id, state.order.length]
        ])
      }) 

    case CHANGE_STEP:
      return Object.assign({}, state, {
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: action.text,
            rule: state.allSteps.get(action.id).rule,
            params: state.allSteps.get(action.id).params
          }]
        ])
      }) 

    case CHANGE_RULE:
      return Object.assign({}, state, {
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: state.allSteps.get(action.id).formula,
            rule: action.text,
            params: state.allSteps.get(action.id).params
          }]
        ])
      }) 

    case CHANGE_PARAMS:
      return Object.assign({}, state, {
        allSteps: new Map([
          ...state.allSteps,
          [action.id, {
            formula: state.allSteps.get(action.id).formula,
            rule: state.allSteps.get(action.id).rule,
            params: action.text
          }]
        ])
      }) 

    case CHANGE_CONST:
      return Object.assign({}, state, {
        language: {
          constants: action.text,
          functions: state.language.functions,
          predicates: state.language.predicates
        }
      })
      
    case CHANGE_FUN:
      return Object.assign({}, state, {
        language: {
          constants: state.language.constants,
          functions: action.text,
          predicates: state.language.predicates
        }
      })

    case CHANGE_PRED:
      return Object.assign({}, state, {
        language: {
          constants: state.language.constants,
          functions: state.language.functions,
          predicates: action.text
        }
      })
        
    case DELETE_STEP:
      let delOrder = state.rank.get(action.id);
      let newSteps = new Map(state.allSteps);
      newSteps.delete(action.id);
      let newRank = new Map(state.rank);
      newRank.delete(action.id);
      for (var [key, value] of newRank.entries()) {
        if (value > delOrder) {
          newRank.set(key, value-1)
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
            formula: "",
            rule: "",
            params: []
          }]
        ]),
        rank: new Map([
          ...state.rank,
          [action.id, action.position]
        ])
      }) 

    case STEP_UP:
      newRank = new Map(state.rank);
      newRank.set(action.id, action.position-1);
      newRank.set(state.rank.get(state.order[action.position-1]), action.position);
      return Object.assign({}, state, {
        order: [
          ...state.order.slice(0, action.position-1),
          state.order[action.position],
          state.order[action.position-1],
          ...state.order.slice(action.position+1)     
        ],
        rank: newRank
      }) 

    case STEP_DOWN:
      newRank = new Map(state.rank);
      newRank.set(action.id, action.position+1);
      newRank.set(state.rank.get(state.order[action.position+1]), action.position);
      return Object.assign({}, state, {
        order: [
          ...state.order.slice(0, action.position),
          state.order[action.position+1],
          state.order[action.position],
          ...state.order.slice(action.position+2)     
        ],
        rank: newRank
      }) 

    default:
      return state
  }
}

const undoableSteps = undoable(steps, {
  groupBy: groupByActionTypes([CHANGE_STEP, CHANGE_PARAMS]),
})

export default undoableSteps
