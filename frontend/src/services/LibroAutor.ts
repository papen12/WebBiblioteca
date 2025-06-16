import { fetchApi } from "./api";
import type { Autor} from "../../../backend/Models/Autor";

export class LibroAutorService {
    static async obtenerLibrosConAutoresYSinopsis(): Promise<{
        titulo: string;
        sinopsis: string;
        autores: string[];
    }[]> {
        try {
            return await fetchApi("/la/sinopsis");
        } catch (error) {
            console.error("Error al obtener libros con autores:", error);
            throw error;
        }
    }

    static async obtenerBiografiasAutores(): Promise<Autor[]> {
        try {
            const data = await fetchApi("/la/bio");
            return data.map((autor: any) => ({
                nombre: autor.nombre,
                nacionalidad: autor.nacionalidad,
                fechaNac: new Date(autor.fecha_nacimiento).getFullYear(),
                fechaMuerte: autor.fecha_muerte ? new Date(autor.fecha_muerte).getFullYear() : null,
                biografia: autor.biografia,
                idAutor: autor.id_autor || autor.id 
            }));
        } catch (error) {
            console.error("Error al obtener biografías de autores:", error);
            throw error;
        }
    }

}