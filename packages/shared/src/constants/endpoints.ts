export const API_ENDPOINTS = {
    USER: {
      FETCH: (userId: string) => `/users/${userId}`,
      UPDATE: (userId: string) => `/users/${userId}`,
    },
} as const;