import { connect } from 'react-redux'
import { changeConst, changeFun, changePred, inputFocus, inputBlur } from '../actions'
import Language from '../components/Language'

const mapStateToProps = (state) => ({
  language: state.present.language
})

const mapDispatchToProps = ({
    onConstChange: changeConst,
    onFunChange: changeFun,
    onPredChange: changePred,
    onFocus: inputFocus,
    onBlur: inputBlur
})

const ActualLanguage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Language)

export default ActualLanguage
