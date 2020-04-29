import { connect } from 'react-redux'
import { deleteStep, changeStep, insertStep, moveStepDown, moveStepUp, changeRule, changeReference1, changeReference2, changeRenaming, changeUnifier, inputFocus, inputBlur } from '../actions'
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
  onReference1: changeReference1,
  onReference2: changeReference2,
  onStepInsert: insertStep,
  onStepUp: moveStepUp,
  onStepDown: moveStepDown,
  inputFocus: inputFocus,
  inputBlur: inputBlur
})

const ActualProof = connect(
  mapStateToProps,
  mapDispatchToProps
)(Proof)

export default ActualProof