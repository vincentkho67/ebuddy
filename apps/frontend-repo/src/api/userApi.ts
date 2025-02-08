import { User, UpdateUserRequest, ApiResponse, PaginatedResponse } from '@ebuddy/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const IS_DEV = process.env.NODE_ENV === 'development';

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

const getAuthHeader = (token: string) => ({
  'Authorization': `Bearer ${IS_DEV ? 'test-token' : token}`,
  'Content-Type': 'application/json',
});

export const userApi = {

  fetchAllUsers: async (
    token: string, 
    pageSize: number = 10,
    lastDoc?: string
  ): Promise<PaginatedResponse<User[]>> => {
    const queryParams = new URLSearchParams({
      pageSize: pageSize.toString(),
      ...(lastDoc && { lastDoc })
    });

    const response = await fetch(
      `${API_BASE_URL}/users?${queryParams}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  },


  fetchUserData: async (userId: string, token: string): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: getAuthHeader(token),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    return response.json();
  },

  updateUserData: async (updateRequest: UpdateUserRequest, token: string): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_BASE_URL}/users/${updateRequest.userId}`, {
      method: 'PATCH',
      headers: getAuthHeader(token),
      body: JSON.stringify(updateRequest.data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update user data');
    }
    
    return response.json();
  },
};