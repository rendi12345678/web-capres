import React from "react";

function Input({ type, name, value, placeholder, handleOnChange }) {
  return (
    <label htmlFor={name}>
       {name} <br />
      <input
        type={type}
        id={name}
        value={value}
        name={name}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
    </label>
  );
}

export default Input;
