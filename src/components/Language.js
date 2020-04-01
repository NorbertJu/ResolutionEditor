import React from 'react'
import ErrorMsg from '../components/ErrorMsg'

const Language = ({language, onConstChange, onFunChange, onPredChange}) => {
    return (
    <div className="mt-3">
        <h2>Language</h2>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Constants</span>
            </div>
            <input type="text" className={`form-control ${language.const.error ? "is-invalid" : ""}`} name="constants"
            onChange={e => onConstChange(e.target.value)}
            value={language.const.input}/>
            <ErrorMsg error={language.const.error} input={language.const.input} />
        </div>
        
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Functions</span>
            </div>
            <input type="text" className={`form-control ${language.fun.error ? "is-invalid" : ""}`} name="functions" 
            onChange={e => onFunChange(e.target.value)} 
            value={language.fun.input}/>
            <ErrorMsg error={language.fun.error} input={language.fun.input} />
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Predicates</span>
            </div>
            <input type="text" className={`form-control ${language.pred.error ? "is-invalid" : ""}`} name="predicates" 
            onChange={e => onPredChange(e.target.value)} 
            value={language.pred.input}/>
            <ErrorMsg error={language.pred.error} input={language.pred.input} />
        </div>

    </div>
)}

export default Language