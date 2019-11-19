import React from 'react'
import PropTypes from 'prop-types'
import Step from './Step'

const Proof = ({ steps, onStepClick, onStepChange}) => (
  <div style={{margin:'20px 0px'}}>
    {steps.map(step =>
      <Step
        key={step.id}
        {...step} 
        onChange={(value) => onStepChange(step.id, value)}
        onClick={() => onStepClick(step.id)}
      />
    )}
  </div>
)

Proof.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onStepClick: PropTypes.func.isRequired,
  onStepChange: PropTypes.func.isRequired
}

export default Proof