import type { Libro, LibroFunc } from "../../../backend/Models/Libro";
import { fetchApi } from "./api";

export class LibroService {
    static async getAll(): Promise<Libro[]> {
        return fetchApi("/libro")
    }
    static async getById(id: number): Promise<Libro> {
        return fetchApi(`/libro/${id}`);
    }

    static async create(libro: LibroFunc): Promise<Libro> {
        return fetchApi("/libro", {
            method: "POST",
            body: JSON.stringify(libro),
        });
    }

    static async update(id: number, libro: LibroFunc): Promise<Libro> {
        return fetchApi(`/libro/${id}`, {
            method: "PUT",
            body: JSON.stringify(libro),
        });
    }

    static async delete(id: number): Promise<void> {
        await fetchApi(`/libro/${id}`, {
            method: "DELETE",
        });
    }
}