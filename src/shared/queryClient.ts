import { QueryClient } from '@tanstack/react-query';
import type { APIErrorResponse } from './types';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 3,
    },
  },
});

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: APIErrorResponse;
  }
}
