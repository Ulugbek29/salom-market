import { useEffect, useState } from "react";
import request from "../services/client";

export default function useFetchGet(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    request(url)
      .then((res) => {
        setData(res.data ?? []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return [data, isLoading];
}
