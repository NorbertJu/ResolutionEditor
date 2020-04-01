import React from 'react'
import PropTypes from 'prop-types'
import ErrorMsg from '../components/ErrorMsg'

const Step = ({ index, step, onChange, onDelete, onInsert, onUp, onDown, onRule, onRenaming, onUnifier, onReference, onBlur }) => (
  <div>
    <button type="button" className="btn btn-light btn-sm" onClick={onInsert} style={{ float: "right" }}> + </button>

    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">{index}</span>
      </div>
      <input type="text" className={`form-control ${step.formula.error ? "is-invalid" : ""}`} name="item"
        onChange={e => onChange(e.target.value)}
        onBlur={e => onBlur()}
        value={step.formula.input}
      />
      <div className="input-group-append">
        <select className="form-control" onChange={e => onRule(e.target.value)} value={step.rule}>
          <option>Premise</option>
          <option>Resolution</option>
          <option>Factoring</option>
        </select>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onUp} disabled={onUp === null}> ↑ </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onDown} disabled={onDown === null}> ↓ </button>
        <button className="btn btn-outline-danger" type="button" onClick={onDelete} >X</button>
      </div>
      <ErrorMsg error={step.formula.error} input={step.formula.input} />
    </div>
    <div className="row">
      {
        (step.rule === "Resolution") &&
        <div className="form-group col">
          <label htmlFor="renaming">Renaming</label>
          <input type="text" placeholder="Renaming" className="form-control" name="renaming" onChange={e => onRenaming(e.target.value)} value={step.renaming.input} />
        </div>
      }
      {
        (step.rule === "Resolution" || step.rule === "Factoring") &&
        <div className="form-group col">
          <label htmlFor="unifier">Unifier</label>
          <input type="text" placeholder="Unifier" className="form-control" name="unifier" onChange={e => onUnifier(e.target.value)} value={step.unifier.input} />
        </div>
      }
      {
        (step.rule === "Resolution" || step.rule === "Factoring") &&
        <div className="form-group col-2">
          <label htmlFor="reference">Reference</label>
          <input type="text" placeholder="Reference" className="form-control" name="reference" onChange={e => onReference(e.target.value)} value={step.reference.input} />
        </div>
      }
    </div>
  </div>
)

Step.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired
}

export default Step