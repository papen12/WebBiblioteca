export interface Persona {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
     genero:string
}

export type PersonaFunc = Omit<Persona, "id">;
