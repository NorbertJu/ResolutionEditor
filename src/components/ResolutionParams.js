import React from 'react'
import Reference from './ReferenceFormGroup'
import Unifier from './UnifierFormGroup'
import Renaming from './RenamingFormGroup';

const Resolution = ({ reference1, reference2, renaming, unifier, index, onReference1, onReference2, onRenaming, onUnifier }) => {
    return (
        <div className="form-row">
            <Reference reference={reference1} index={index} number={1} onReference={onReference1}/>
            <Renaming renaming={renaming} index={index} onRenaming={onRenaming} />
            <Reference reference={reference2} index={index} number={2} onReference={onReference2}/>
            <Unifier unifier={unifier} index={index} onUnifier={onUnifier} />
        </div>
    );
}
export default Resolution