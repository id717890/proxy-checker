import axios, {AxiosInstance} from 'axios';

export function createAxios(): AxiosInstance {
  const instance = axios.create({
    baseURL: 'https://inf-proxy-checker.netlic.ru/',
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
