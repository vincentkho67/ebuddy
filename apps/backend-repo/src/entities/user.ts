export interface User {
    id: string;
    totalAverageWeightRatings: number;
    numberOfRents: number;
    recentlyActive: number;
}
  
export interface UpdateUserRequest {
    userId: string;
    data: Partial<Omit<User, 'id'>>;
}
  
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}