import React from 'react'

const ErrorMsg = ({error, input}) => {
    if (error.hasOwnProperty("location")) return (
        <div className="invalid-feedback pr-1 pl-1">
            <b>{input.substring(0, error.location.start.offset)}<mark className="text-danger">
            {input.substring(error.location.start.offset, error.location.end.offset)}</mark>
            {input.substring(error.location.end.offset, input.length)}</b><br/>
            {error.name + ": " + error.message}
        </div>
    ); else if (error) return (
        <div className="invalid-feedback pr-1 pl-1">
            {error.name + ": " + error.message}
        </div>
    ); else return null;
}
export default ErrorMsg