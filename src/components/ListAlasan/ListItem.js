import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ListItem({ users, isError, isLoading }) {
  const renderUserListItem = (user, index) => (
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
  );

  const renderError = () => (
    <p style={{ color: "red", marginTop: "1rem" }}>Something went wrong!</p>
  );

  const renderSkeleton = () => (
    <Skeleton count={5} style={{ marginTop: "1rem" }} />
  );

  const renderNoComments = () => <p>Tidak ada komentar!</p>;

  return (
    <ul>
      {users.length
        ? users.map((user, index) => renderUserListItem(user, index))
        : isError
        ? renderError()
        : isLoading
        ? renderSkeleton()
        : renderNoComments()}
    </ul>
  );
}

export default ListItem;
