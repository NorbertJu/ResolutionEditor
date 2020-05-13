import { ADD_STEP, CHANGE_STEP, DELETE_STEP, INSERT_STEP, STEP_UP, STEP_DOWN, CHANGE_RULE, CHANGE_RENAMING, CHANGE_REFERENCE1, CHANGE_REFERENCE2, CHANGE_UNIFIER, CHANGE_CONST, CHANGE_FUN, CHANGE_PRED, IMPORT_STATE } from '../actions'
import { step, validateReference, validateRenaming, validateUnifier, validateClause } from './step'

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

    case CHANGE_RULE:
    case CHANGE_RENAMING:
    case CHANGE_UNIFIER:
    case CHANGE_REFERENCE1:
    case CHANGE_REFERENCE2:
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
            step(s, action),
            id,
            state,
            language
          ));
        }
        else if ((s.rule === "Factoring" && checked.has(s.reference2.object)) ||
          (s.rule === "Resolution" && (checked.has(s.reference2.object) || checked.has(s.reference1.object)))) {
          checked.add(i);
          allSteps.set(id, validateStep(
            allSteps.get(id),
            id,
            { ...state, allSteps },
            language
          ));
        }
      }
      return { ...state, allSteps };
    }

    case DELETE_STEP: {
      let delOrder = state.rank.get(action.id);
      let newSteps = new Map([...state.allSteps]);
      newSteps.delete(action.id);
      let newOrder = [...state.order.filter(id => id !== action.id)];
      const position = state.rank.get(action.id);
      let newRank = new Map([...state.rank]);
      newRank.delete(action.id);
      for (let [key, value] of newRank.entries()) {
        if (value > delOrder) {
          newRank.set(key, value - 1)
        }
      }
      for (let i = position + 1; i < state.order.length; i++) {
        const id = state.order[i];
        let step = newSteps.get(id);
        newSteps.set(id, {
          ...step,
          reference1: checkReferenceAfterDelete({ ...step.reference1 }, position),
          reference2: checkReferenceAfterDelete({ ...step.reference2 }, position)
        })
      }
      let newState = { ...state, rank: newRank, order: newOrder, allSteps: newSteps };
      for (let i = position; i < newState.order.length; i++) {
        let id = newState.order[i];
        newSteps.set(id, validateStep(
          newSteps.get(id),
          id,
          { ...newState, newSteps },
          language
        ));
      }
      return {
        ...newState,
        allSteps: newSteps
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
      let newOrder = [
        ...state.order.slice(0, action.position),
        action.id,
        ...state.order.slice(action.position)
      ];
      let newSteps = new Map([
        ...state.allSteps,
        [action.id, newStep]
      ]);
      for (let i = action.position + 1; i < state.order.length; i++) {
        const id = state.order[i];
        let step = newSteps.get(id);
        newSteps.set(id, {
          ...step,
          reference1: checkReferenceAfterInsert({ ...step.reference1 }, action.position),
          reference2: checkReferenceAfterInsert({ ...step.reference2 }, action.position)
        })
      }
      let newState = { ...state, rank: newRank, order: newOrder, allSteps: newSteps };
      for (let i = action.position + 1; i < newState.order.length; i++) {
        let id = newState.order[i];
        newSteps.set(id, validateStep(
          newSteps.get(id),
          id,
          { ...newState, newSteps },
          language
        ));
      }
      return {
        ...newState,
        allSteps: newSteps
      }
    }

    case STEP_UP: {
      let newRank = new Map([...state.rank]);
      newRank.set(state.order[action.position], action.position - 1);
      newRank.set(state.order[action.position - 1], action.position);
      let newOrder = [
        ...state.order.slice(0, action.position - 1),
        state.order[action.position],
        state.order[action.position - 1],
        ...state.order.slice(action.position + 1)
      ]
      let newSteps = new Map([...state.allSteps]);
      for (let i = action.position - 1; i < state.order.length; i++) {
        const id = state.order[i];
        let step = newSteps.get(id);
        newSteps.set(id, {
          ...step,
          reference1: checkReferenceAfterMove({ ...step.reference1 }, action.position, action.position - 1),
          reference2: checkReferenceAfterMove({ ...step.reference2 }, action.position, action.position - 1)
        })
      }
      let newState = { ...state, rank: newRank, order: newOrder, allSteps: newSteps };
      let checked = new Set();
      for (let i = action.position - 1; i < newState.order.length; i++) {
        let id = newState.order[i];
        let step = newSteps.get(id);
        if (i === action.position - 1 || i === action.position ||
          (step.rule === "Factoring" && checked.has(step.reference2.object)) ||
          (step.rule === "Resolution" && (checked.has(step.reference2.object) || checked.has(step.reference1.object)))) {
          checked.add(i);
          newSteps.set(id, validateStep(
            newSteps.get(id),
            id,
            { ...newState, newSteps },
            language
          ));
        }
      }
      return {
        ...newState,
        allSteps: newSteps
      }
    }

    case STEP_DOWN: {
      let newRank = new Map([...state.rank]);
      newRank.set(state.order[action.position], action.position + 1);
      newRank.set(state.order[action.position + 1], action.position);
      let newOrder = [
        ...state.order.slice(0, action.position),
        state.order[action.position + 1],
        state.order[action.position],
        ...state.order.slice(action.position + 2)
      ]
      let newSteps = new Map([...state.allSteps]);
      for (let i = action.position; i < state.order.length; i++) {
        const id = state.order[i];
        let step = newSteps.get(id);
        newSteps.set(id, {
          ...step,
          reference1: checkReferenceAfterMove({ ...step.reference1 }, action.position, action.position + 1),
          reference2: checkReferenceAfterMove({ ...step.reference2 }, action.position, action.position + 1)
        })
      }
      let newState = { ...state, rank: newRank, order: newOrder, allSteps: newSteps };
      let checked = new Set();
      for (let i = action.position; i < newState.order.length; i++) {
        let id = newState.order[i];
        let step = newSteps.get(id);
        if (i === action.position || i === action.position + 1 ||
          (step.rule === "Factoring" && checked.has(step.reference2.object)) ||
          (step.rule === "Resolution" && (checked.has(step.reference2.object) || checked.has(step.reference1.object)))) {
          checked.add(i);
          newSteps.set(id, validateStep(
            newSteps.get(id),
            id,
            { ...newState, newSteps },
            language
          ));
        }
      }
      return {
        ...newState,
        allSteps: newSteps
      }
    }

    case CHANGE_CONST:
    case CHANGE_FUN:
    case CHANGE_PRED: 
    case IMPORT_STATE: {
      const allSteps = new Map(state.allSteps);
      for (let id of state.order) {
        allSteps.set(id, validateStep(
          step(allSteps.get(id), action),
          id,
          { ...state, allSteps },
          language
        ));
      }
      return { ...state, allSteps };
    }

    default:
      return state
  }
}

function checkReferenceAfterInsert(reference, position) {
  if (reference.object >= position) {
    reference = {
      object: reference.object + 1,
      input: reference.object + 2 + "",
      error: ""
    }
  }
  return reference;
}

function checkReferenceAfterDelete(reference, position) {
  if (reference.object > position) {
    reference = {
      object: reference.object - 1,
      input: reference.object + "",
      error: ""
    }
  } else if (reference.object === position) {
    reference = {
      object: undefined,
      input: "",
      error: ""
    }
  }
  return reference;
}

function checkReferenceAfterMove(reference, position1, position2) {
  if (reference.object === position1) {
    reference = {
      object: position2,
      input: position2 + 1 + "",
      error: ""
    }
  } else if (reference.object === position2) {
    reference = {
      object: position1,
      input: position1 + 1 + "",
      error: ""
    }
  }
  return reference;
}

function validateStep(step, id, state, language) {
  let reference1 = validateReference({ ...step.reference1 }, id, state);
  let reference2 = validateReference({ ...step.reference2 }, id, state);
  let renaming = validateRenaming({ ...step.renaming }, language);
  let unifier = validateUnifier({ ...step.unifier }, language);
  let formula = validateClause({ ...step.formula }, language)
  let newStep = {
    ...step,
    reference1: reference1[1],
    reference2: reference2[1],
    renaming: renaming[1],
    unifier: unifier[1],
    formula: formula[1]
  }
  switch (step.rule) {
    case "Factoring": {
      if (!reference2[0]) {
        return { ...newStep, valid: false };
      }
      const premise = getPremise(reference2[1].object, state);
      if (!premise || !formula[0]) {
        return { ...newStep, valid: false };
      }

      if (newStep.formula.object.isFactorOf(premise.formula.object, newStep.unifier.object)) {
        return { ...newStep, valid: true, formula: { ...newStep.formula, error: "" } };
      } else {
        return {
          ...newStep, valid: false, formula: {
            ...newStep.formula, error: {
              name: "LogicError",
              message: "This clause is not valid factor of clause " + newStep.reference2.input
            }
          }
        };
      }
    }

    case "Resolution": {
      if (!reference2[0] || !reference1[0]) {
        return { ...newStep, valid: false };
      }
      const premise1 = getPremise(reference1[1].object, state);
      const premise2 = getPremise(reference2[1].object, state);
      if (!premise1 || !premise2 || !formula[0]) {
        return { ...newStep, valid: false };
      }
      if (newStep.formula.object.isResolventOf(premise1.formula.object, premise2.formula.object, newStep.renaming.object, newStep.unifier.object)) {
        return { ...newStep, valid: true, formula: { ...newStep.formula, error: "" } };
      } else {
        return {
          ...newStep, valid: false, formula: {
            ...newStep.formula, error: {
              name: "LogicError",
              message: "This clause is not valid resolvent of clauses " + newStep.reference1.input + " and " + newStep.reference2.input
            }
          }
        };
      }
    }

    case "Assumption": {
      if (!formula[0]) {
        return { ...newStep, valid: false };
      }
      return { ...newStep, valid: true };
    }

    default:
      return { ...newStep };
  }
}

function getPremise(reference, state) {
  const premise = state.allSteps.get(state.order[parseInt(reference)]);
  if (premise.valid) {
    return premise;
  }
  return null;
}

export default steps;