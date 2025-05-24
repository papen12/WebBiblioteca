export interface Reserva {
    id: number;
    fec_reserva: string; // o Date si usas objetos Date
    fec_prestamo: string;
    limite_de_fec: string;
    estado: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
}

export type ReservaFunc = Omit<Reserva, "id" | "fecha_creacion" | "fecha_actualizacion">;