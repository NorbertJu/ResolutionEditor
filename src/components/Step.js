import React from 'react'
import PropTypes from 'prop-types'

const Step = ({ index, formula, rule, renaming, unifier, reference, onChange ,onDelete, onInsert, onUp, onDown, onRule, onRenaming, onUnifier, onReference }) => (
  <div>
  <button type="button" className="btn btn-light btn-sm" onClick={onInsert} style={{float:"right"}}> + </button>
  
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">{index}</span>
    </div>
    <input type="text" className="form-control" name="item" onChange={e => onChange(e.target.value)} value={formula}/>
    <div className="input-group-append">
      <select className="form-control" onChange={e => onRule(e.target.value)} value={rule}>
        <option>Premise</option>
        <option>Resolution</option>
        <option>Factoring</option>
      </select>
      {
        (rule === "Resolution") && 
        <input type="text" placeholder="Renaming" className="form-control" name="renaming" onChange={e => onRenaming(e.target.value)} value={renaming}/>
      }
      {
        (rule === "Resolution" || rule === "Factoring") && 
        <input type="text" placeholder="Unifier" className="form-control" name="unifier" onChange={e => onUnifier(e.target.value)} value={unifier}/>
      }
      {
        (rule === "Resolution" || rule === "Factoring") &&
        <input type="text" placeholder="Reference" className="form-control w-50" name="reference" onChange={e => onReference(e.target.value)} value={reference}/>
      }
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
  rule: PropTypes.string.isRequired
}

export default Step