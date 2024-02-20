import { useContextSelector } from "use-context-selector";
import { AppContext } from "../App";

function useContextHook() {
  const context = useContextSelector(AppContext, (state) => state);

  return context;
}

export default useContextHook;
