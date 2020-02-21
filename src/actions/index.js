export const ADD_STEP = 'ADD_STEP';
export const CHANGE_STEP = 'CHANGE_STEP';
export const CHANGE_RULE = 'CHANGE_RULE';
export const CHANGE_PARAMS = 'CHANGE_PARAMS';
export const DELETE_STEP = 'DELETE_STEP';
export const INSERT_STEP = 'INSERT_STEP';
export const STEP_UP = 'STEP_UP';
export const STEP_DOWN = 'STEP_DOWN';
export const CHANGE_CONST = 'CHANGE_CONST';
export const CHANGE_FUN = 'CHANGE_FUN';
export const CHANGE_PRED = 'CHANGE_PRED';

let nextStepId = 0

export const addStep = () => ({
  type: ADD_STEP,
  id: nextStepId++,
})

export const changeStep = (id, text) => ({
  type: CHANGE_STEP,
  id,
  text
})

export const changeRule = (id, text) => ({
  type: CHANGE_RULE,
  id,
  text
})

export const changeConst = (text) => ({
  type: CHANGE_CONST,
  text
})

export const changeFun = (text) => ({
  type: CHANGE_FUN,
  text
})

export const changePred = (text) => ({
  type: CHANGE_PRED,
  text
})

export const changeParams = (id, text) => ({
  type: CHANGE_PARAMS,
  id,
  text
})

export const deleteStep = (id) => ({
  type: DELETE_STEP,
  id
})

export const insertStep = (position) => ({
  type: INSERT_STEP,
  id: nextStepId++,
  position
})

export const moveStepUp = (position) => ({
  type: STEP_UP,
  position
})

export const moveStepDown = (position) => ({
  type: STEP_DOWN,
  position
})