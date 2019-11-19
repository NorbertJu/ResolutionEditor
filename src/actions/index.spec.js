import * as actions from './index'

describe('step actions', () => {
  it('addSodo should create ADD_STEP action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: 'ADD_STEP',
      id: 0,
      text: 'Use Redux'
    })
  })
})
