import type { Opiniones, OpinionesFunc } from "../../../backend/Models/Opiniones";
import { fetchApi } from "./api";

export class OpinionesService {
    static async getAll(): Promise<Opiniones[]> {
        return fetchApi("/opiniones")
    }
    static async getById(id: number): Promise<Opiniones> {
        return fetchApi(`/opiniones/${id}`);
    }

    static async create(opiniones: OpinionesFunc): Promise<Opiniones> {
        return fetchApi("/opiniones", {
            method: "POST",
            body: JSON.stringify(opiniones),
        });
    }

    static async update(id: number, opiniones: OpinionesFunc): Promise<Opiniones> {
        return fetchApi(`/opiniones/${id}`, {
            method: "PUT",
            body: JSON.stringify(opiniones),
        });
    }

    static async delete(id: number): Promise<void> {
        await fetchApi(`/opiniones/${id}`, {
            method: "DELETE",
        });
    }
}