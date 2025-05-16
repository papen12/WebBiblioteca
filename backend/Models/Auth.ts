import { Cliente } from './Cliente';
import { Persona } from './Persona';

export interface AuthResponse {
    token: string;
    usuario: {
        cliente: Cliente;
        persona: Persona;
    };
}