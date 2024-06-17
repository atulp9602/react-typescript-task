import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const BASE_URL: string = "https://dummyjson.com";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthToken = (): string | null => localStorage.getItem("token");

const onRequestSuccess = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token: string | null = getAuthToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onResponseSuccess = (response: AxiosResponse): AxiosResponse => {
  if (response.status === 204) {
    return {
      ...response,
      data: null,
    };
  }
  return response;
};

const onResponseError = (error: any): Promise<never> => {
  let errorMessage: string = "Something Went Wrong !!";
  if (error.response) {
    errorMessage =
      error.response.data?.message ?? error.message ?? "Something Went Wrong";
    if (error.response.status >= 400) {
      localStorage.clear();
      window.location.replace("/authentication/login");
    }
  } else if (!navigator.onLine) {
    errorMessage = "Please, Check Network Connection !!";
  } else {
    errorMessage = "Server Not Responding !! Try Again after some time";
  }
  return Promise.reject(errorMessage);
};

axiosInstance.interceptors.request.use(onRequestSuccess, (error) =>
  Promise.reject(error)
);
axiosInstance.interceptors.response.use(onResponseSuccess, onResponseError);

export default axiosInstance;
