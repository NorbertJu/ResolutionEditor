import * as actions from './index'

describe('step actions', () => {
  it('addStep should create ADD_STEP action', () => {
    expect(actions.addStep('Use Redux')).toEqual({
      type: 'ADD_STEP',
      id: 0,
      text: 'Use Redux'
    })
  })
})
