import { useMemo, useState } from "react";
import useGetAllUserData from "./useGetAllUserData";
import useGetLocalStorage from "./useGetLocalStorage";

function useListAlasan() {
  const [category, setCategory] = useState("Prabowo");
  const [query, setQuery] = useState("");
  const { isError, isLoading } = useGetAllUserData();
  const users = useGetLocalStorage("users") || [];
  const categoryId =
    category === "Prabowo" ? "1" : category === "Ganjar" ? "2" : "3";

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    const regex = new RegExp(query, "i");
    return users.filter(
      (user) =>
        user.pilihanCapresId === categoryId &&
        regex.test(user.nama.toLowerCase())
    );
  }, [category, query]);

  return { setCategory, category, setQuery, filteredUsers, isError, isLoading };
}

export default useListAlasan;
