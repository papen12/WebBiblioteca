import type { Reserva } from "../../../backend/Models/Reserva";
import type { Libro } from "../../../backend/Models/Libro";
import { fetchApi } from "./api";

export class ReservaService {
    static async getAll(): Promise<Reserva[]> {
        return fetchApi("/reserva");
    }

    static async getLibrosDisponibles(): Promise<Libro[]> {
        try {
            const response = await fetchApi("/reserva/catalogo/disponibles");
            if (!response || !response.data || !Array.isArray(response.data)) {
                throw new Error("Formato de respuesta inesperado");
            }
            return response.data.map((libro: any) => ({
                idLibro: libro.id_libro,
                isbn: libro.isbn,
                titulo: libro.titulo,
                portada: libro.portada,
                sinopsis: libro.sinopsis,
                genero: libro.genero,
                editorial: libro.editorial,
                fechaPublicacion: new Date(libro.fecha_publicacion)
            }));
        } catch (error) {
            console.error("Error al obtener libros disponibles:", error);
            throw error;
        }
    }

    static async crearReservaDirecta(idLibro: number, ciCliente: string,fechaInicio:Date,fechaLimite:Date): Promise<{
        success: boolean;
        message: string;
        data: {
            idReserva: number;
            idLibro: number;
            ciCliente: string;
        }
    }> {
        try {
            const response = await fetchApi("/reserva/directa", {
                method: "POST",
                body: JSON.stringify({
                id_libro: idLibro,
                ci_cliente: ciCliente,
                fec_reserva: fechaInicio,  
                fec_limite: fechaLimite,
                fecReserva:fechaInicio    
})
            });
            
            return {
                success: response.success,
                message: response.message,
                data: {
                    idReserva: response.data.id_reserva,
                    idLibro: response.data.id_libro,
                    ciCliente: response.data.ci_cliente
                }
            };
        } catch (error) {
            console.error("Error al crear reserva directa:", error);
            throw error;
        }
    }
}