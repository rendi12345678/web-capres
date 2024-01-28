import React, { useContext } from "react";
import { AppContext } from "../App";
const Input = React.forwardRef((props, ref) => {
  const { errors } = useContext(AppContext);
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
});

export default React.memo(Input);
