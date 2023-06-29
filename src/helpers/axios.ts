import axios, {AxiosInstance} from 'axios';

export function createAxios(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_DOMAIN,
  });

  instance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      return Promise.reject(error);
    }
  );

  return instance;
}
