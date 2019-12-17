import React from 'react'
import PropTypes from 'prop-types'

const Step = ({ text, onChange ,onDelete, onInsert, onUp, onDown }) => (
  <div>
  <button type="button" className="btn btn-light btn-sm" onClick={onInsert} > + </button>
  <button type="button" className="btn btn-light btn-sm" onClick={onUp} > ↑ </button>
  <button type="button" className="btn btn-light btn-sm" onClick={onDown} > ↓ </button>
  <div className="input-group mb-3">
    <input type="text" className="form-control" name="item" onChange={e => onChange(e.target.value)} value={text}/>
    <div className="input-group-append">
      <button className="btn btn-danger" type="button" onClick={onDelete} >X</button>
    </div>
  </div>
  </div>
)

Step.propTypes = {
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onInsert: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default Step