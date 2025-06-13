import type { Autor, AutorFunc } from "../../../backend/Models/Autor";
import { fetchApi } from "./api";

export class AutorService{
    static async getAll():Promise<Autor[]>{
        return fetchApi("/autor")
    }
     static async getById(id: number): Promise<Autor> {
    return fetchApi(`/autor/${id}`);
  }
  static async getByNombre(nombre: string): Promise<Autor[]> {
    return fetchApi(`/autor/nombre/${nombre}`);
  }

  static async create(autor: AutorFunc): Promise<Autor> {
    return fetchApi("/autor", {
      method: "POST",
      body: JSON.stringify(autor),
    });
  }

  static async update(id: number, autor: AutorFunc): Promise<Autor> {
    return fetchApi(`/autor/${id}`, {
      method: "PUT",
      body: JSON.stringify(autor),
    });
  }

  static async delete(id: number): Promise<void> {
    await fetchApi(`/autor/${id}`, {
      method: "DELETE",
    });
  }

}