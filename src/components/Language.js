import React, {useState} from 'react'
import ErrorMsg from './ErrorMsg'
import {parseConstants, parseFunctions, parsePredicates} from '@fmfi-uk-1-ain-412/js-fol-parser'

const Language = ({steps, onConstChange, onFunChange, onPredChange, constInput, funInput, predInput}) => {
    let[constError, setConstError] = useState(undefined);
    let[funError, setFunError] = useState(undefined);
    let[predError, setPredError] = useState(undefined);
    return (
    <div className="border rounded pt-2 pl-3 pr-3 mt-3">
        <h2>Language</h2>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Constants</span>
            </div>
            <input type="text" className="form-control" name="constants"
            onChange={e => onConstChange(e.target.value)}
            onBlur={e => {
                try { constInput = e.target; 
                    if (constInput.value !== "") parseConstants(e.target.value); 
                    setConstError(undefined); 
                    constInput.classList.remove("border-danger");
                } 
                catch (e) {setConstError({...e,input: constInput.value}); 
                    constInput.classList.add("border-danger");
                }
            }}
            value={steps.language.constants}/>
        </div>
        <ErrorMsg error={constError}/>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Functions</span>
            </div>
            <input type="text" className="form-control" name="functions" 
            onChange={e => onFunChange(e.target.value)} 
            onBlur={e => {
                try {funInput = e.target; 
                    if (funInput.value !== "") parseFunctions(e.target.value); 
                    setFunError(undefined); 
                    funInput.classList.remove("border-danger");
                }
                catch (e) {setFunError({...e,input: funInput.value}); 
                    funInput.classList.add("border-danger");
                }
            }}
            value={steps.language.functions}/>
        </div>
        <ErrorMsg error={funError}/>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Predicates</span>
            </div>
            <input type="text" className="form-control" name="predicates" 
            onChange={e => onPredChange(e.target.value)} 
            onBlur={e => {
                try {predInput = e.target; 
                    if (predInput.value !== "") parsePredicates(e.target.value); 
                    setPredError(undefined); 
                    predInput.classList.remove("border-danger");
                } 
                catch (e) {setPredError({...e,input: predInput.value});
                    predInput.classList.add("border-danger");
                }
            }}
            value={steps.language.predicates}/>
        </div>
        <ErrorMsg error={predError}/>
    </div>
)}


export default Language