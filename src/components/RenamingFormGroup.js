import React from 'react'
import ErrorMsg from '../components/ErrorMsg'

const Renaming = ({renaming, index, onRenaming, onFocus, onBlur}) => {
    return (
        <div className="form-group col mb-2">
          <label style={{fontSize: ".875rem"}} className="lb-sm mb-1" htmlFor={"renaming-" + index}>Renaming</label>
          <input type="text" className={`form-control form-control-sm ${renaming.error ? "is-invalid" : ""}`} id={"renaming-" + index} 
          onChange={e => onRenaming(e.target.value)} 
          onBlur={e => onBlur(e.target.value)}
          onFocus={e => onFocus(e.target.value)}
          value={renaming.input} />
          <ErrorMsg error={renaming.error} input={renaming.input} />
        </div>
    );
}
export default Renaming