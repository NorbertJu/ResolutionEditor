import React from 'react'
import ErrorMsg from '../components/ErrorMsg'

const Reference = ({reference, index, number, onReference, onFocus, onBlur}) => {
    return (
        <div className="form-group col-2 mb-2">
          <label className="mb-1 fs-sm" htmlFor={"reference" +number+"-" + index}>Premise {number}</label>
          <input type="text" className={`form-control form-control-sm ${reference.error ? "is-invalid" : ""}`} id={"reference" +number+"-" + index} 
          onChange={e => onReference(e.target.value)} 
          onBlur={e => onBlur(e.target.value)}
          onFocus={e => onFocus(e.target.value)}
          value={reference.input} />
          <ErrorMsg error={reference.error} />
        </div>
    );
}
export default Reference