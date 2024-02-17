import React from "react";
import useContextHook from "../hooks/useContextHook";
const Input = React.forwardRef((props, ref) => {
  const { errors } = useContextHook();
  const { name, type, placeholder } = props;

  return (
    <label htmlFor={name}>
      {name} <br />
      <input
        ref={ref}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
      />{" "}
      <br />
      {errors &&
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
});

export default React.memo(Input);
