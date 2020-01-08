import React from 'react'
import { connect } from 'react-redux'
import { addStep } from '../actions'

let AddStep = ({ dispatch }) => {
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        dispatch(addStep())
      }}>
        <button type="submit" className="btn btn-outline-success">
          Add Step
        </button>
      </form>
    </div>
  )
}
AddStep = connect()(AddStep)

export default AddStep
