import React from 'react'
import PropTypes from 'prop-types'
import ErrorMsg from '../components/ErrorMsg'

const Step = ({ index, step, onChange, onDelete, onInsert, onUp, onDown, onRule, onRenaming, onUnifier, onReference1, onReference2, onBlur }) => (
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
          <option>Assumption</option>
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
      {(step.rule === "Resolution") &&
        <div className="form-group col-2">
          <label htmlFor={"reference1-" + index}>Reference</label>
          <input type="text" className={`form-control ${step.reference1.error ? "is-invalid" : ""}`} id={"reference1-" + index} 
          onChange={e => onReference1(e.target.value)} value={step.reference1.input} />
          <ErrorMsg error={step.reference1.error} />
        </div>
      }
      {(step.rule === "Resolution") &&
        <div className="form-group col">
          <label htmlFor={"renaming-" + index}>Renaming</label>
          <input type="text" className={`form-control ${step.renaming.error ? "is-invalid" : ""}`} id={"renaming-" + index} 
          onChange={e => onRenaming(e.target.value)} value={step.renaming.input} />
          <ErrorMsg error={step.renaming.error} input={step.renaming.input} />
        </div>
      }
      {(step.rule === "Resolution" || step.rule === "Factoring") &&
        <div className="form-group col-2">
          <label htmlFor={"reference2-" + index}>Reference</label>
          <input type="text" className={`form-control ${step.reference2.error ? "is-invalid" : ""}`} id={"reference2-" + index}
          onChange={e => onReference2(e.target.value)} value={step.reference2.input} />
          <ErrorMsg error={step.reference2.error} />
        </div>
      }
      {(step.rule === "Resolution" || step.rule === "Factoring") &&
        <div className="form-group col">
          <label htmlFor={"unifier-" + index}>Unifier</label>
          <input type="text" className={`form-control ${step.unifier.error ? "is-invalid" : ""}`} id={"unifier-" + index} 
          onChange={e => onUnifier(e.target.value)} value={step.unifier.input} />
          <ErrorMsg error={step.unifier.error} input={step.unifier.input} />
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