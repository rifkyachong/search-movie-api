import axios from "axios";
import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(async () => {
    try {
      const res = await axios.get(url);
      setData(res);
    } catch (error) {
      setErr(error);
    }
  }, []);

  return [data, err];
}
