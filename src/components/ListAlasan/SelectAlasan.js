import React from "react";
import Select from "../Select";

function SelectAlasan({ setCategory }) {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <h3>
      Alasan2 pilih &nbsp;
      <Select handleOnChange={handleCategoryChange}>
        <Select.Option key="1">Prabowo</Select.Option>
        <Select.Option key="2">Ganjar</Select.Option>
        <Select.Option key="3">Anies</Select.Option>
      </Select>
    </h3>
  );
}

export default React.memo(SelectAlasan);
