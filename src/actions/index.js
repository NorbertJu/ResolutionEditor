export const ADD_STEP = 'ADD_STEP';
export const CHANGE_STEP = 'CHANGE_STEP';
export const DELETE_STEP = 'DELETE_STEP';

let nextStepId = 0

export const addStep = (text) => ({
  type: ADD_STEP,
  id: nextStepId++,
  text
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