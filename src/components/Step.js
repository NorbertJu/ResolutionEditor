import React from 'react'
import PropTypes from 'prop-types'

const Step = ({ index, text, onChange ,onDelete, onInsert, onUp, onDown }) => (
  <div>
  <button type="button" className="btn btn-light btn-sm" onClick={onInsert} style={{float:"right"}}> + </button>
  
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">{index+1}</span>
    </div>
    <input type="text" className="form-control" name="item" onChange={e => onChange(e.target.value)} value={text}/>
    <div className="input-group-append">
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
  text: PropTypes.string.isRequired
}

export default Step