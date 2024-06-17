import { useState } from "react";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../config/http.config";

interface FetchProps {
  endpoint: string;
  method?: "get" | "post" | "put" | "delete" | "patch";
  data?: any;
}

interface FetchResult {
  response: AxiosResponse | null;
  error: AxiosError | string;
  isLoading: boolean;
  fetchData: () => void;
}

export default function useFetch({
  endpoint,
  method = "get",
  data = null,
}: FetchProps): FetchResult {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<AxiosError | string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let res: AxiosResponse;
      switch (method) {
        case "get":
          res = await axiosInstance.get(endpoint);
          break;
        case "post":
          res = await axiosInstance.post(endpoint, data);
          break;
        case "put":
          res = await axiosInstance.put(endpoint, data);
          break;
        case "delete":
          res = await axiosInstance.delete(endpoint);
          break;
        case "patch":
          res = await axiosInstance.patch(endpoint, data);
          break;
        default:
          throw new Error(`Unsupported request method: ${method}`);
      }
      setResponse(res);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, fetchData };
}
