import React from "react";

function Item({ nama, pilihanCapresId, alasan }) {
  return (
    <li>
      {nama && pilihanCapresId ? (
        <blockquote>
          <p>
            " {alasan} " <strong>- {nama}</strong>
          </p>
        </blockquote>
      ) : null}
    </li>
  );
}

export default Item;
