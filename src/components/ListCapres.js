import React from "react";
import ListCapresItems from "./ListCapresItems";

function ListCapres() {
  return (
    <section className="list-capres">
      <h3>Coblos pilihan anda</h3>
      <ListCapresItems />
    </section>
  );
}

export default React.memo(ListCapres);
