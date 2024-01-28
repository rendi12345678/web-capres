import React from "react";

function ListItem({ user }) {
  return (
    <li>
      <blockquote>
        <p>
          "{user.alasan}" - <strong>{user.nama}</strong>
        </p>
      </blockquote>
    </li>
  );
}

export default ListItem;
