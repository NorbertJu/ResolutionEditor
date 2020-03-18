import React from 'react'
import {parseConstants, parseFunctions, parsePredicates} from '@fmfi-uk-1-ain-412/js-fol-parser'

const Language = ({steps, onConstChange, onFunChange, onPredChange, constInput, funInput, predInput}) => {
    return (
    <div className="mt-3">
        <h2>Language</h2>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Constants</span>
            </div>
            <input type="text" className="form-control" name="constants"
            onChange={e => {
                onConstChange(e.target.value);
                try { 
                    constInput = e.target; 
                    if (constInput.value !== "") parseConstants(e.target.value); 
                    constInput.classList.remove("is-invalid");
                } 
                catch (e) { 
                    const constError = document.getElementById("constError");
                    constError.innerHTML = "<b>" + constInput.value.substring(0, e.location.start.offset) + "<mark>" +
                    constInput.value.substring(e.location.start.offset, e.location.end.offset) + "</mark>" +
                    constInput.value.substring(e.location.end.offset, constInput.value.length) + "</b><br/>" +
                    e.name + ": " + e.message;
                    constInput.classList.add("is-invalid");
                }   
            }}
            value={steps.language.constants}/>
            <div className="invalid-feedback pr-1 pl-1" id="constError"></div>
        </div>
        
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Functions</span>
            </div>
            <input type="text" className="form-control" name="functions" 
            onChange={e => {
                onFunChange(e.target.value);
                try { 
                    funInput = e.target; 
                    if (funInput.value !== "") parseFunctions(e.target.value); 
                    funInput.classList.remove("is-invalid");
                } 
                catch (e) { 
                    const funError = document.getElementById("funError");
                    funError.innerHTML = "<b>" + funInput.value.substring(0, e.location.start.offset) + "<mark>" +
                    funInput.value.substring(e.location.start.offset, e.location.end.offset) + "</mark>" +
                    funInput.value.substring(e.location.end.offset, funInput.value.length) + "</b><br/>" +
                    e.name + ": " + e.message;
                    funInput.classList.add("is-invalid");
                } 
            }} 
            value={steps.language.functions}/>
            <div className="invalid-feedback pr-1 pl-1" id="funError"></div>
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Predicates</span>
            </div>
            <input type="text" className="form-control" name="predicates" 
            onChange={e => {
                onPredChange(e.target.value);
                try { 
                    predInput = e.target; 
                    if (predInput.value !== "") parsePredicates(e.target.value); 
                    predInput.classList.remove("is-invalid");
                } 
                catch (e) { 
                    const predError = document.getElementById("predError");
                    predError.innerHTML = "<b>" + predInput.value.substring(0, e.location.start.offset) + "<mark>" +
                    predInput.value.substring(e.location.start.offset, e.location.end.offset) + "</mark>" +
                    predInput.value.substring(e.location.end.offset, predInput.value.length) + "</b><br/>" +
                    e.name + ": " + e.message;
                    predInput.classList.add("is-invalid");
                }
            }} 
            value={steps.language.predicates}/>
            <div className="invalid-feedback pr-1 pl-1" id="predError"></div>
        </div>

    </div>
)}



export default Language