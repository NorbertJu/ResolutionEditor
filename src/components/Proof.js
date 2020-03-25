import React from 'react'
import PropTypes from 'prop-types'
import Step from './Step'

const Proof = ({ steps, onStepDelete, onStepChange, onStepInsert, onStepUp, onStepDown, onRuleChange, onRenaming, onUnifier, onReference}) => (
  <div style={{margin:'20px 0px'}}>
    <h2>Proof</h2>
    {steps.order.map((id, index) =>
      <Step
        key={id}
        step = {steps.allSteps.get(id)} 
        index={index+1}
        state={steps}
        onChange={(value) => onStepChange(id, value)}
        onRule={(value) => onRuleChange(id, value)}
        onRenaming={(value) => onRenaming(id, value)}
        onUnifier={(value) => onUnifier(id, value)}
        onReference={(value) => onReference(id, value)}
        onDelete={() => onStepDelete(id)}
        onInsert={() => onStepInsert(index)}
        onUp={index === 0 ? null : () => onStepUp(index)}
        onDown={index === steps.order.length-1 ? null : () => onStepDown(index)}
      />
    )}
  </div>
)

Proof.propTypes = {
  steps: PropTypes.shape({
    order: PropTypes.arrayOf(PropTypes.number.isRequired),
    allSteps : PropTypes.instanceOf(Map).isRequired,
    rank: PropTypes.instanceOf(Map).isRequired
  }).isRequired,
  onStepDelete: PropTypes.func.isRequired,
  onStepChange: PropTypes.func.isRequired,
  onRuleChange: PropTypes.func.isRequired,
  onStepInsert: PropTypes.func.isRequired,
  onStepUp: PropTypes.func.isRequired,
  onStepDown: PropTypes.func.isRequired
}

export default Proof