function useGetLocalStorage(key) {
  const localStorageData = window.localStorage.getItem(key);

  return JSON.parse(localStorageData);
}

export default useGetLocalStorage;
