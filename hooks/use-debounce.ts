import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debounceValue, setdebounceValue] = useState<T>(value);
  useEffect(() => {
    //update the bounce value after the delay
    const handler = setTimeout(() => {
      setdebounceValue(value);
    }, delay);

    //clean up the function to clear the timeout on component unmount
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};
