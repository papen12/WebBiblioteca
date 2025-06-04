import type { Reserva, ReservaFunc } from "../../../backend/Models/Reserva";
import { fetchApi } from "./api";

export class ReservaService {
    static async getAll(): Promise< Reserva[]> {
        return fetchApi("/reserva")
    }
    static async getById(id: number): Promise<Reserva> {
        return fetchApi(`/reserva/${id}`);
    }

    static async create(reserva: ReservaFunc): Promise<Reserva> {
        return fetchApi("/reserva", {
            method: "POST",
            body: JSON.stringify(reserva),
        });
    }

    static async update(id: number, reserva: ReservaFunc): Promise<Reserva> {
        return fetchApi(`/reserva/${id}`, {
            method: "PUT",
            body: JSON.stringify(reserva),
        });
    }

    static async delete(id: number): Promise<void> {
        await fetchApi(`/reserva/${id}`, {
            method: "DELETE",
        });
    }
}