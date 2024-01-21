import React from 'react'

function Button({type, handleClick, className, children}) {
  return (
    <button className={className ? className : ""} type={type} onClick={handleClick ? handleClick : null}>{children}</button>
  )
}

export default Button