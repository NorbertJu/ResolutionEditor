import { connect } from 'react-redux'
import { deleteStep, changeStep } from '../actions'
import Proof from '../components/Proof'

const mapStateToProps = (state) => ({
  steps: state.steps.present
})

const mapDispatchToProps = ({
  onStepClick: deleteStep,
  onStepChange: changeStep
})

const ActualProof = connect(
  mapStateToProps,
  mapDispatchToProps
)(Proof)

export default ActualProof
