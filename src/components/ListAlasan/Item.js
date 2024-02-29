import React from "react";

function Item({ nama, pilihanCapresId, alasan }) {
  return (
    <li>
      {nama && pilihanCapresId ? (
        <blockquote>
          <p>
            <strong>~ {nama}</strong>
          </p>
          <p>" {alasan} "</p>
          <div className="icons">
            <button className="like-icon">s</button>
            <span className="total-amount">300</span>
            <button className="like-icon">d</button>
            <span className="total-amount">300</span>
          </div>
        </blockquote>
      ) : null}
    </li>
  );
}

export default Item;
