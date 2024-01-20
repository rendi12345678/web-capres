import React from "react";

function Input({ type, value, name, placeholder }) {
  return (
    <label htmlFor={name}>
       {name} <br />
      <input
        type={type}
        id={name}
        value={value}
        name={name}
        placeholder={placeholder}
      />
    </label>
  );
}

export default Input;
