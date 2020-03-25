import { connect } from 'react-redux'
import { deleteStep, changeStep, insertStep, moveStepDown, moveStepUp, changeRule, changeReference, changeRenaming, changeUnifier } from '../actions'
import Proof from '../components/Proof'

const mapStateToProps = (state) => ({
  steps: state.present.steps
})

const mapDispatchToProps = ({
  onStepDelete: deleteStep,
  onStepChange: changeStep,
  onRuleChange: changeRule,
  onRenaming: changeRenaming,
  onUnifier: changeUnifier,
  onReference: changeReference,
  onStepInsert: insertStep,
  onStepUp: moveStepUp,
  onStepDown: moveStepDown  
})

const ActualProof = connect(
  mapStateToProps,
  mapDispatchToProps
)(Proof)

export default ActualProof
