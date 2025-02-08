import { User, UpdateUserRequest, ApiResponse } from '@ebuddy/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}
export const userApi = {
  fetchUserData: async (userId: string, token: string): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  },

  updateUserData: async (updateRequest: UpdateUserRequest, token: string): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_BASE_URL}/users/${updateRequest.userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateRequest.data),
    });

    if (!response.ok) {
      throw new Error('Failed to update user data');
    }

    return response.json();
  },
};