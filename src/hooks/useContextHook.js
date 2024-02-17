import { useContext } from "react";
import { AppContext } from "../App";

function useContextHook() {
  const context = useContext(AppContext);

  return context;
}

export default useContextHook;
