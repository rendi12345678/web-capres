import React, { useContext } from "react";
import { AppContext } from "../App";
function Input({ type, name, value, placeholder, handleOnChange }) {
  const { errors } = useContext(AppContext);

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
      />{" "}
      <br />
      {errors.length !== 0 &&
        errors.map(
          ({ path, msg }, index) =>
            path === name && (
              <p key={index} className="error-msg">
                {msg}
              </p>
            )
        )}
    </label>
  );
}

export default React.memo(Input);
