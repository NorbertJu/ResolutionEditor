import React from 'react'

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
            <div className="invalid-feedback pr-1 pl-1" id="constError" dangerouslySetInnerHTML={{__html: language.const.error}}></div>
        </div>
        
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Functions</span>
            </div>
            <input type="text" className={`form-control ${language.fun.error ? "is-invalid" : ""}`} name="functions" 
            onChange={e => onFunChange(e.target.value)} 
            value={language.fun.input}/>
            <div className="invalid-feedback pr-1 pl-1" id="funError" dangerouslySetInnerHTML={{__html: language.fun.error}}></div>
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Predicates</span>
            </div>
            <input type="text" className={`form-control ${language.pred.error ? "is-invalid" : ""}`} name="predicates" 
            onChange={e => onPredChange(e.target.value)} 
            value={language.pred.input}/>
            <div className="invalid-feedback pr-1 pl-1" id="predError" dangerouslySetInnerHTML={{__html: language.pred.error}}></div>
        </div>

    </div>
)}

export default Language