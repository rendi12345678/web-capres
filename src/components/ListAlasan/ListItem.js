import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ListItem({ users, isError }) {
  console.log(users);

  return users.length ? (
    users.map((user, index) => (
      <li key={index + 1}>
        {user.nama || user.alasan ? (
          <blockquote>
            <p>
              "{user.alasan}" - <strong>{user.nama}</strong>
            </p>
          </blockquote>
        ) : (
          <Skeleton />
        )}
      </li>
    ))
  ) : isError ? (
    <p style={{ color: "red", marginTop: "1rem" }}>Something went wrong!</p>
  ) : (
    <Skeleton count={5} style={{ marginTop: "1rem" }} />
  );
}

export default ListItem;
