import type { Multa, MultaFunc } from "../../../backend/Models/Multa";
import { fetchApi } from "./api";

export class MultaService {
    static async getAll(): Promise< Multa[]> {
        return fetchApi("/multa")
    }
    static async getById(id: number): Promise<Multa> {
        return fetchApi(`/multa/${id}`);
    }

    static async create(cliente: MultaFunc): Promise<Multa> {
        return fetchApi("/multa", {
            method: "POST",
            body: JSON.stringify(cliente),
        });
    }

    static async update(id: number, multa: MultaFunc): Promise<Multa> {
        return fetchApi(`/multa/${id}`, {
            method: "PUT",
            body: JSON.stringify(multa),
        });
    }

    static async delete(id: number): Promise<void> {
        await fetchApi(`/multa/${id}`, {
            method: "DELETE",
        });
    }
}