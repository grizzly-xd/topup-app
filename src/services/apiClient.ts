import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL) {
  // Tidak crash total; cukup log peringatan agar developer sadar.
  // eslint-disable-next-line no-console
  console.warn('[apiClient] VITE_API_BASE_URL belum diisi.');
}

export const apiClient = axios.create({
  baseURL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// Provider token disuntikkan dari AuthContext saat login/logout.
let tokenProvider: () => Promise<string | null> = async () => null;
export const setTokenProvider = (fn: () => Promise<string | null>) => {
  tokenProvider = fn;
};

apiClient.interceptors.request.use(async (config) => {
  const token = await tokenProvider();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (r) => r,
  (error: AxiosError) => {
    // Jangan log body (bisa mengandung data sensitif).
    // eslint-disable-next-line no-console
    console.debug('[apiClient] error', error.config?.method, error.config?.url, error.response?.status);
    return Promise.reject(error);
  }
);
