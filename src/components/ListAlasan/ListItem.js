import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ListItem({ users, isError, isLoading }) {
  const rowRenderer = users.map((user, index) => {
    const { nama, pilihanCapresId, alasan } = user;
    return (
      <li key={index + 1}>
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
  });

  const renderUserList = () => rowRenderer;

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
    return renderUserList();
  };

  return <ul>{renderContent()}</ul>;
}

export default React.memo(ListItem);
