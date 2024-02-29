import { useMemo } from "react";
import useContextHook from "./useContextHook";
import useGetAllUserData from "./useGetAllUserData";
import useGetLocalStorage from "./useGetLocalStorage";

function useListSuara() {
  const { id, alasan } = useContextHook();
  const { isError, isLoading } = useGetAllUserData();
  const users = useGetLocalStorage("users") || [];

  const jumlahPemilihanCapres = useMemo(() => {
    const voteCounts = {
      prabowo: 0,
      ganjar: 0,
      anies: 0,
    };

    if (!users) return voteCounts;

    users.forEach(({ pilihanCapresId }) => {
      if (pilihanCapresId === "1") {
        voteCounts.prabowo += 1;
      } else if (pilihanCapresId === "2") {
        voteCounts.ganjar += 1;
      } else if (pilihanCapresId === "3") {
        voteCounts.anies += 1;
      }
    });

    return voteCounts;
  }, [id, alasan]);

  return { jumlahPemilihanCapres, isLoading, isError };
}

export default useListSuara;
