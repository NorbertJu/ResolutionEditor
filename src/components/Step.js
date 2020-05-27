import React from 'react'
import PropTypes from 'prop-types'
import ErrorMsg from '../components/ErrorMsg'
import Resolution from './ResolutionParams'
import Factoring from './FactoringParams'

const Step = ({ index, step, onChange, onDelete, onInsert, onUp, onDown, onRule, onRenaming, onUnifier, onReference1, onReference2, onBlur, onFocus }) => (
  <div className="step">
    <div className="input-group mb-2 input-group-sm">
      <div className="input-group-prepend">
        <span className="input-group-text">{index}</span>
      </div>
      <input type="text" name="item" className={`form-control 
        ${step.formula.error ? "is-invalid" : ""}
        ${step.valid ? "is-valid" : ""}`} 
        onChange={e => onChange(e.target.value)}
        onBlur={e => onBlur(e.target.value)}
        onFocus={e => onFocus(e.target.value)}
        value={step.formula.input}
      />
      <div className="input-group-append input-group-sm">
        <select className="form-control" 
        onChange={e => onRule(e.target.value)} 
        value={step.rule}>
          <option>Assumption</option>
          <option>Resolution</option>
          <option>Factoring</option>
        </select>
        <button type="button" className="btn btn-outline-success btn-sm" onClick={onInsert}> + </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onUp} disabled={onUp === null}> ↑ </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onDown} disabled={onDown === null}> ↓ </button>
        <button className="btn btn-outline-danger" type="button" onClick={onDelete} >X</button>
      </div>
      <ErrorMsg error={step.formula.error} input={step.formula.input} />
    </div>
    {
      {
        'Resolution': <Resolution reference1={step.reference1} reference2={step.reference2} renaming={step.renaming} unifier={step.unifier}
          index={index} onReference1={onReference1} onReference2={onReference2} onRenaming={onRenaming} onUnifier={onUnifier} 
          onFocus={onFocus} onBlur={onBlur}/>,
        'Factoring': <Factoring reference={step.reference2} unifier={step.unifier} index={index} onReference={onReference2} onUnifier={onUnifier}
          onFocus={onFocus} onBlur={onBlur} />
      }[step.rule]
    }
  </div>
);

Step.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired
}

export default Step