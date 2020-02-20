import React from 'react'
import PropTypes from 'prop-types'

const Step = ({ index, formula, rule, params, onChange ,onDelete, onInsert, onUp, onDown, onRule, onParams }) => (
  <div>
  <button type="button" className="btn btn-light btn-sm" onClick={onInsert} style={{float:"right"}}> + </button>
  
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">{index+1}</span>
    </div>
    <input type="text" className="form-control" name="item" onChange={e => onChange(e.target.value)} value={formula}/>
    <div className="input-group-append">
      <select className="form-control" onChange={e => onRule(e.target.value)} value={rule}>
        <option>Formula</option>
        <option>Rezolvencia</option>
        <option>Faktorizácia</option>
      </select>
      {(rule === "Rezolvencia" || rule === "Faktorizácia") && <input type="text" className="form-control" name="params" onChange={e => onParams(e.target.value)} value={params}/>}
      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onUp} disabled={onUp===null}> ↑ </button>
      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onDown} disabled={onDown===null}> ↓ </button>
      <button className="btn btn-outline-danger" type="button" onClick={onDelete} >X</button>
    </div>
  </div>
  </div>
)

Step.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
  formula: PropTypes.string.isRequired,
  rule: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired
}

export default Step