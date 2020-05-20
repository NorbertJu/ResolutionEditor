import React from 'react'
import ErrorMsg from '../components/ErrorMsg'

const Language = ({language, onConstChange, onFunChange, onPredChange, onFocus, onBlur}) => {
    return (
    <div className="mt-2">
        <h2>Language</h2>
        <div className="input-group mb-2 input-group-sm">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Constants</span>
            </div>
            <input type="text" className={`form-control ${language.consts.error ? "is-invalid" : ""}`} name="constants"
            onChange={e => onConstChange(e.target.value)}
            onBlur={e => onBlur(e.target.value)}
            onFocus={e => onFocus(e.target.value)}
            value={language.consts.input}/>
            <ErrorMsg error={language.consts.error} input={language.consts.input} />
        </div>
        
        <div className="input-group mb-2 input-group-sm">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Functions</span>
            </div>
            <input type="text" className={`form-control ${language.funs.error ? "is-invalid" : ""}`} name="functions" 
            onChange={e => onFunChange(e.target.value)}
            onBlur={e => onBlur(e.target.value)}
            onFocus={e => onFocus(e.target.value)} 
            value={language.funs.input}/>
            <ErrorMsg error={language.funs.error} input={language.funs.input} />
        </div>
        <div className="input-group mb-2 input-group-sm">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Predicates</span>
            </div>
            <input type="text" className={`form-control ${language.preds.error ? "is-invalid" : ""}`} name="predicates" 
            onChange={e => onPredChange(e.target.value)} 
            onBlur={e => onBlur(e.target.value)}
            onFocus={e => onFocus(e.target.value)}
            value={language.preds.input}/>
            <ErrorMsg error={language.preds.error} input={language.preds.input} />
        </div>

    </div>
)}

export default Language