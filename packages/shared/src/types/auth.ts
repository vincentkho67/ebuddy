export interface AuthToken {
    token: string;
    expiresAt: number;
}
  
export interface LoginCredentials {
    email: string;
    password: string;
}