import axios from 'axios';
import type { ApiErrorBody } from '@/types/api';

export function extractApiMessage(err: unknown, fallback = 'Terjadi kesalahan.'): string {
  if (axios.isAxiosError<ApiErrorBody>(err)) {
    return err.response?.data?.error?.message ?? err.message ?? fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}
