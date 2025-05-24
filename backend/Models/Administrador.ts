export interface Administrador {
    administrador_de_ci: string;
    id_persona: number;
    usuario: string;
    contraseña: string;
}

export type AdministradorFunc = Omit<Administrador, 'administrador_de_ci'>;
