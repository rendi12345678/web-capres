import React from "react";

function Select({ children, handleOnChange }) {
  return <select onChange={handleOnChange}>{children}</select>;
}

function Option({ children }) {
  return <option>{children}</option>;
}

Select.Option = Option;


export default Select;
