import React from 'react'
import ErrorMsg from '../components/ErrorMsg'

const Renaming = ({renaming, index, onRenaming, onFocus, onBlur}) => {
    return (
        <div className="form-group col">
          <label htmlFor={"renaming-" + index}>Renaming</label>
          <input type="text" className={`form-control ${renaming.error ? "is-invalid" : ""}`} id={"renaming-" + index} 
          onChange={e => onRenaming(e.target.value)} 
          onBlur={e => onBlur(e.target.value)}
          onFocus={e => onFocus(e.target.value)}
          value={renaming.input} />
          <ErrorMsg error={renaming.error} input={renaming.input} />
        </div>
    );
}
export default Renaming