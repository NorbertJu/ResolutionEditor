import React from 'react'
import PropTypes from 'prop-types'
import Step from './Step'

const Proof = ({ steps, onStepDelete, onStepChange, onStepInsert, onStepUp, onStepDown}) => (
  <div style={{margin:'20px 0px'}}>
    {steps.map((step, index) =>
      <Step
        key={step.id}
        {...step} 
        index={index}
        onChange={(value) => onStepChange(step.id, value)}
        onDelete={() => onStepDelete(step.id)}
        onInsert={() => onStepInsert(index)}
        onUp={index === 0 ? null : () => onStepUp(index)}
        onDown={index === steps.length-1 ? null : () => onStepDown(index)}
      />
    )}
  </div>
)

Proof.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onStepDelete: PropTypes.func.isRequired,
  onStepChange: PropTypes.func.isRequired,
  onStepInsert: PropTypes.func.isRequired,
  onStepUp: PropTypes.func.isRequired,
  onStepDown: PropTypes.func.isRequired
}

export default Proof