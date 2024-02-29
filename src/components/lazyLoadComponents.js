import { lazy } from "react";

export const ListCapres = lazy(() => import("./ListCapres/ListCapres"));
export const Header = lazy(() => import("./Header"));
export const ListSuara = lazy(() => import("./ListSuara/ListSuara"));
export const ListAlasan = lazy(() => import("./ListAlasan/ListAlasan"));
export const UserAuthentication = lazy(() =>
  import("./Authentication/UserAuthentication")
);
