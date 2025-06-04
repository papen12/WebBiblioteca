import type { Administrador, AdministradorFunc } from "../../../backend/Models/Administrador";
import { fetchApi } from "./api";

export class AdministradorService {
    static async getAll(): Promise<Administrador[]> {
        return fetchApi("/administrador")
    }
    static async getById(id: number): Promise<Administrador> {
        return fetchApi(`/administrador/${id}`);
    }

    static async create(administrador: AdministradorFunc): Promise<Administrador> {
        return fetchApi("/administrador", {
            method: "POST",
            body: JSON.stringify(administrador),
        });
    }

    static async update(id: number, administrador: AdministradorFunc): Promise<Administrador> {
        return fetchApi(`/administrador/${id}`, {
            method: "PUT",
            body: JSON.stringify(administrador),
        });
    }

    static async delete(id: number): Promise<void> {
        await fetchApi(`/administrador/${id}`, {
            method: "DELETE",
        });
    }
}