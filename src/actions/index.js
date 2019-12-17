export const ADD_STEP = 'ADD_STEP';
export const CHANGE_STEP = 'CHANGE_STEP';
export const DELETE_STEP = 'DELETE_STEP';
export const INSERT_STEP = 'INSERT_STEP';
export const STEP_UP = 'STEP_UP';
export const STEP_DOWN = 'STEP_DOWN';

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