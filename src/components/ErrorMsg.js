import React from 'react'

const ErrorMsg = ({error}) => {
    if (error !== undefined && error.input.value !== "") return (
        <div className="alert alert-danger" role="alert">
            {error.input.parentElement.classList.remove("mb-3")}
            {error.input.parentElement.classList.add("mb-0")}
            {error.input.value.substring(0, error.location.start.offset)}<mark>
            {error.input.value.substring(error.location.start.offset, error.location.end.offset)}</mark>
            {error.input.value.substring(error.location.end.offset, error.input.value.length)}<br/>
            {error.name + ": " + error.message}
        </div>
    ); else return null;
}
export default ErrorMsg