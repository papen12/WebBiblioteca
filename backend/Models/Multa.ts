export interface Multa {
    id: number;
    monto: number;
    motivo: string;
    estado: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
}

export type MultaFunc = Omit<Multa, "id" | "fecha_creacion" | "fecha_actualizacion">;
