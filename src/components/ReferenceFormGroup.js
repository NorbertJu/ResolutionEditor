import React from 'react'
import ErrorMsg from '../components/ErrorMsg'

const Reference = ({reference, index, number, onReference}) => {
    return (
        <div className="form-group col-2">
          <label htmlFor={"reference" +number+"-" + index}>Premise {number}</label>
          <input type="text" className={`form-control ${reference.error ? "is-invalid" : ""}`} id={"reference" +number+"-" + index} 
          onChange={e => onReference(e.target.value)} value={reference.input} />
          <ErrorMsg error={reference.error} />
        </div>
    );
}
export default Reference