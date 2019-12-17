import { connect } from 'react-redux'
import { deleteStep, changeStep, insertStep, moveStepDown, moveStepUp } from '../actions'
import Proof from '../components/Proof'

const mapStateToProps = (state) => ({
  steps: state.steps.present
})

const mapDispatchToProps = ({
  onStepDelete: deleteStep,
  onStepChange: changeStep,
  onStepInsert: insertStep,
  onStepUp: moveStepUp,
  onStepDown: moveStepDown  
})

const ActualProof = connect(
  mapStateToProps,
  mapDispatchToProps
)(Proof)

export default ActualProof
