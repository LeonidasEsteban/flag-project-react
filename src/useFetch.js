import {useCallback, useEffect, useState} from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  const fetchData = useCallback(
    () => {
      setErrorInfo(null);
      setIsLoading(true);

      fetch(url)
        .then((response) => {
          return response.json()
        })
        .then((response) => {
          setIsLoading(false);
          setData(response);
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorInfo(error);
        })
    },
    [url]
  );

  useEffect(
    () => {
      fetchData();
    },
    [fetchData]
  );

  return {data, isLoading, errorInfo, fetchData};
}
