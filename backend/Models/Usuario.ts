export interface Usuario {
    id_usuario: number;
    cl_usuario: string;
    usuario: string;
    password: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    genero: string;
    fecha_nac: Date;
    foto: string;
    id_rol: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}

export type NuevoUsuario = Omit<Usuario, "id_usuario" | "fecha_creacion" | "fecha_actualizacion">;
