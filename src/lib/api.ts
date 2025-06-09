// lib/api.ts
import axios from 'axios';
import { useAuthStore } from './auth';
import { socket } from './socket';

const API = process.env.NEXT_PUBLIC_API_URL!;
const api = axios.create({ baseURL: API, withCredentials: true });

/* --------  request: attach access token -------- */
api.interceptors.request.use((config) => {
  const at = useAuthStore.getState().accessToken;
  if (at) config.headers.Authorization = `Bearer ${at}`;
  return config;
});

/* --------  response: auto‑refresh on 401 -------- */
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      /* 🍪  Guard: skip refresh if cookie absent */
      const hasCookie = document.cookie.split('; ').some(c => c.startsWith('kuluma_rt='));
      if (!hasCookie) {
        useAuthStore.getState().clear();
        if (typeof window !== 'undefined') window.location.href = '/login?expired=1';
        return Promise.reject(err);
      }

      try {
        const { data } = await axios.post('/api/auth/refresh', {}, { baseURL: API, withCredentials: true });

        /* store new access token */
        useAuthStore.getState().setSession(data.accessToken, data.user);
        if (socket.connected) socket.disconnect();
        socket.auth = { token: data.accessToken };
        socket.connect();

        /* retry original request */
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        /* refresh failed => log out once, no loop */
        useAuthStore.getState().clear();
        if (typeof window !== 'undefined') window.location.href = '/login?expired=1';
      }
    }

    return Promise.reject(err);
  }
);

export default api;
