import React from 'react'
import Reference from './ReferenceFormGroup'
import Unifier from './UnifierFormGroup'
import Renaming from './RenamingFormGroup';

const Resolution = ({ reference1, reference2, renaming, unifier, index, onReference1, onReference2, onRenaming, onUnifier, onFocus, onBlur}) => {
    return (
        <div className="form-row">
            <Reference reference={reference1} index={index} number={1} onReference={onReference1} onFocus={onFocus} onBlur={onBlur}/>
            <Renaming renaming={renaming} index={index} onRenaming={onRenaming} onFocus={onFocus} onBlur={onBlur}/>
            <Reference reference={reference2} index={index} number={2} onReference={onReference2} onFocus={onFocus} onBlur={onBlur}/>
            <Unifier unifier={unifier} index={index} onUnifier={onUnifier} onFocus={onFocus} onBlur={onBlur} />
        </div>
    );
}
export default Resolution