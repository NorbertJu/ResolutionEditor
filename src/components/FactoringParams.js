import React from 'react'
import Reference from './ReferenceFormGroup'
import Unifier from './UnifierFormGroup'

const Factoring = ({ reference, unifier, index, onReference, onUnifier, onFocus, onBlur }) => {
    return (
        <div className="form-row">
            <Reference reference={reference} index={index} number={1} onReference={onReference} onFocus={onFocus} onBlur={onBlur}/>
            <Unifier unifier={unifier} index={index} onUnifier={onUnifier} onFocus={onFocus} onBlur={onBlur}/>
        </div>
    );
}
export default Factoring