export const saveToLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};
