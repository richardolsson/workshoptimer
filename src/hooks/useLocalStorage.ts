import { useState } from 'react';

type UseLocalStorageReturn<T> = [T, (val: T) => void];

export default function useLocalStorage<T = string>(
  key: string,
  defaultValue: T
): UseLocalStorageReturn<T> {
  const storedValue = localStorage.getItem(key);
  const [val, setVal] = useState<T>(
    storedValue ? JSON.parse(storedValue) : defaultValue
  );

  return [
    val,
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      setVal(value);
    },
  ];
}
