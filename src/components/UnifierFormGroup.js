import React from 'react'
import ErrorMsg from '../components/ErrorMsg'

const Unifier = ({ unifier, index, onUnifier, onFocus, onBlur}) => {
    return (
        <div className="form-group col">
            <label htmlFor={"unifier-" + index}>Unifier</label>
            <input type="text" className={`form-control ${unifier.error ? "is-invalid" : ""}`} id={"unifier-" + index}
                onChange={e => onUnifier(e.target.value)} 
                onBlur={e => onBlur(e.target.value)}
                onFocus={e => onFocus(e.target.value)}
                value={unifier.input} />
            <ErrorMsg error={unifier.error} input={unifier.input} />
        </div>
    );
}
export default Unifier