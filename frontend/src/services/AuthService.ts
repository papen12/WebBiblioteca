import { fetchApi } from './api'; 
interface LoginPayload {
  usuario: string;
  password: string;
}
interface LoginResponse {
  token: string;
}
export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  return fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
