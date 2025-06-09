import { io } from 'socket.io-client';
import { useAuthStore } from './auth';

const API = process.env.NEXT_PUBLIC_API_URL!;   // http://localhost:3001
const WS  = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000';

export const socket = io(WS, {
  autoConnect: false,
  path: '/socket.io',          // stay consistent
});

export const connectSocket = () => {
  const token = useAuthStore.getState().accessToken;
  if (!token) return;
  socket.auth = { token };
  socket.connect();
};