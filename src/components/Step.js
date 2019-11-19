import React from 'react'
import PropTypes from 'prop-types'

const Step = ({ text, onChange ,onClick }) => (
  <div className="input-group mb-3">
    <input type="text" className="form-control" name="item" onChange={e => onChange(e.target.value)} value={text}/>
    <div className="input-group-append">
      <button className="btn btn-danger" type="button" onClick={onClick} >X</button>
    </div>
  </div>
)

Step.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default Step