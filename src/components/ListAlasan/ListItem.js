import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ListItem({ users, isError, isLoading }) {
  const renderUserListItem = (user, index) => (
    <li key={index + 1}>
      {user.nama && user.pilihanCapresId ? (
        <blockquote>
          <p>
            "{user.alasan}" - <strong>{user.nama}</strong>
          </p>
        </blockquote>
      ) : null}
    </li>
  );

  const renderError = () => (
    <p style={{ color: "red", marginTop: "1rem" }}>Something went wrong!</p>
  );

  const renderListAlasanSkeleton = () =>
    Array(8)
      .fill(0)
      .map((_, index) => (
        <li key={index + 1}>
          <p>
            <Skeleton width={"100%"} />
          </p>
        </li>
      ));

  const renderNoComments = () => <p>Tidak ada komentar!</p>;
  const renderContent = () => {
    if (isError) return renderError();
    if (isLoading) return renderListAlasanSkeleton();
    if (!users.length) return renderNoComments();
    return users.map((user, index) => renderUserListItem(user, index));
  };

  return <ul>{renderContent()}</ul>;
}

export default React.memo(ListItem);
