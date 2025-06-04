import type { Persona, PersonaFunc } from "../../../backend/Models/Persona";
import { fetchApi } from "./api";

export class PersonaService {
    static async getAll(): Promise< Persona[]> {
        return fetchApi("/persona")
    }
    static async getById(id: number): Promise<Persona> {
        return fetchApi(`/persona/${id}`);
    }

    static async create(persona: PersonaFunc): Promise<Persona> {
        return fetchApi("/persona", {
            method: "POST",
            body: JSON.stringify(persona),
        });
    }

    static async update(id: number, persona: PersonaFunc): Promise<Persona> {
        return fetchApi(`/persona/${id}`, {
            method: "PUT",
            body: JSON.stringify(persona),
        });
    }

    static async delete(id: number): Promise<void> {
        await fetchApi(`/persona/${id}`, {
            method: "DELETE",
        });
    }
}