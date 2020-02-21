import React from 'react'

const ErrorMsg = ({error}) => {
    if (error !== undefined && error.input !== "") return (
        <div className="alert alert-danger" role="alert">
            {console.log(error)}
            {error.input.substring(0, error.location.start.offset)}<mark>
            {error.input.substring(error.location.start.offset, error.location.end.offset)}</mark>
            {error.input.substring(error.location.end.offset, error.input.length)}<br/>
            {error.name + ": " + error.message}
        </div>
    ); else return null;
}
export default ErrorMsg