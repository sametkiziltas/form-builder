import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import useLocalStorage from "../hooks/useLocalStorage";

export default () => {
  const baseUrl = "http://localhost:12037/api/";
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage("token");

  const doFetch = useCallback((url, options = {}) => {
    setOptions(options);
    setIsLoading(true);
    setUrl(url);
  }, []);

  useEffect(() => {
    let skipGetResponseAfterDestroy = false;
    if (!isLoading) {
      return;
    }

    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : "",
        },
      },
    };
    axios(baseUrl + url, requestOptions)
      .then((res) => {
        if (!skipGetResponseAfterDestroy) {
          setError(null);
          setResponse(res.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (!skipGetResponseAfterDestroy) {
          if (error.response) {
            setError(error.response.data);
          } else {
            setError(error.message);
          }
          setIsLoading(false);
        }
      });
    return () => {
      skipGetResponseAfterDestroy = true;
    };
  }, [isLoading, url, options, token]);

  return [{ isLoading, response, error }, doFetch];
};
