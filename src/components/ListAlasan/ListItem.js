import React, { Suspense, lazy } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Item = lazy(() => import("./Item"));

function ListItem({ users, isError, isLoading }) {
  const rowRenderer = users.map((user, index) => {
    const { nama, pilihanCapresId, alasan } = user;
    return (
      <Suspense fallback={null} key={index + 1}>
        <Item nama={nama} pilihanCapresId={pilihanCapresId} alasan={alasan} />
      </Suspense>
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
