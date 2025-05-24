export interface Cliente {
    ci_cliente: string;
    id_persona: number;
    usuario: string;
    contraseña: string;
}

export type ClienteFunc = Omit<Cliente, 'ci_cliente'>;
