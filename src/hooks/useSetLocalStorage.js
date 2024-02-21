import { useEffect, useState } from "react";

function useSetLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useSetLocalStorage;
