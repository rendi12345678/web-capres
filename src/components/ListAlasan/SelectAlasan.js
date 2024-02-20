import React from "react";

function SelectAlasan({ setCategory, category }) {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <h3>
      Alasan2 pilih &nbsp;
      <select
        name="capres"
        id="capres"
        onChange={handleCategoryChange}
        value={category}
      >
        <option value="1">Prabowo</option>
        <option value="2">Ganjar</option>
        <option value="3">Anies</option>
      </select>
    </h3>
  );
}

export default React.memo(SelectAlasan);
