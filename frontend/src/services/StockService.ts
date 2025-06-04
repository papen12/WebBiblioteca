import type {Stock, StockFunc } from "../../../backend/Models/Stock";
import { fetchApi } from "./api";

export class ReservaService {
    static async getAll(): Promise< Stock[]> {
        return fetchApi("/stock")
    }
    static async getById(id: number): Promise<Stock> {
        return fetchApi(`/stock/${id}`);
    }

    static async create(stock: StockFunc): Promise<Stock> {
        return fetchApi("/stock", {
            method: "POST",
            body: JSON.stringify(stock),
        });
    }

    static async update(id: number, stock: StockFunc): Promise<Stock> {
        return fetchApi(`/stock/${id}`, {
            method: "PUT",
            body: JSON.stringify(stock),
        });
    }

    static async delete(id: number): Promise<void> {
        await fetchApi(`/stock/${id}`, {
            method: "DELETE",
        });
    }
}