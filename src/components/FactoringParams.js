import React from 'react'
import Reference from './ReferenceFormGroup'
import Unifier from './UnifierFormGroup'

const Factoring = ({ reference, unifier, index, onReference, onUnifier }) => {
    return (
        <div className="form-row">
            <Reference reference={reference} index={index} number={1} onReference={onReference}/>
            <Unifier unifier={unifier} index={index} onUnifier={onUnifier} />
        </div>
    );
}
export default Factoring