import { fetchApi } from "./api"; 

export interface SignUpData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  genero: string;
  ci_cliente: string;
  usuario: string;
  password: string;
}

export const signUpService = async (data: SignUpData) => {
  try {
    const response = await fetchApi("/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response; 
  } catch (error) {
    throw error;
  }
};
