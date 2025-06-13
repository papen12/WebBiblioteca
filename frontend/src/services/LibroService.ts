import type { Libro, LibroFunc } from "../../../backend/Models/Libro";
import { fetchApi } from "./api";

export class LibroService {
     static async getAll(): Promise<Libro[]> {
        return fetchApi("/libro")
    }

    static async getById(id: number): Promise<Libro> {
        const response = await fetchApi(`/libro/${id}`);
        return response.data;
    }

    static async create(libro: LibroFunc): Promise<Libro> {
        const response = await fetchApi("/libro", {
            method: "POST",
            body: JSON.stringify(libro),
        });
        return response.data;
    }

    static async update(id: number, libro: LibroFunc): Promise<Libro> {
        const response = await fetchApi(`/libro/${id}`, {
            method: "PUT",
            body: JSON.stringify(libro),
        });
        return response.data;
    }

    static async delete(id: number): Promise<void> {
        await fetchApi(`/libro/${id}`, {
            method: "DELETE",
        });
    }

    static async getByTitulo(titulo: string): Promise<Libro[]> {
        try {
            const response = await fetchApi(`/libro/titulo/${encodeURIComponent(titulo)}`);
            return response.data || [];
        } catch (error) {
            console.error("Error en getByTitulo:", error);
            throw new Error("No se pudo realizar la búsqueda por título");
        }
    }

    static async getByGenero(genero: string): Promise<Libro[]> {
        try {
            const response = await fetchApi(`/libro/genero/${encodeURIComponent(genero)}`);
            return response.data || [];
        } catch (error) {
            console.error("Error en getByGenero:", error);
            throw new Error("No se pudo realizar la búsqueda por género");
        }
    }
}