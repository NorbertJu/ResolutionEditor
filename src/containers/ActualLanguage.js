import { connect } from 'react-redux'
import { changeConst, changeFun, changePred } from '../actions'
import Language from '../components/Language'

const mapStateToProps = (state) => ({
  steps: state.steps.present
})

const mapDispatchToProps = ({
    onConstChange: changeConst,
    onFunChange: changeFun,
    onPredChange: changePred
})

const ActualLanguage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Language)

export default ActualLanguage
