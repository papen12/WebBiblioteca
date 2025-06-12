import { Request, Response } from "express";
import { supabase } from "../src/Config/supabase";

export class StockController {
    static async getStock(req: Request, res: Response): Promise<void> {
        try {
            const { data, error } = await supabase.from("stock").select("*");
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al obtener el stock" });
        }
    }

    static async getStockDisponible(req: Request, res: Response): Promise<void> {
        try {
            const { data, error } = await supabase
                .from("stock")
                .select("*")
                .eq("disponibilidad", true);
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al obtener stock disponible" });
        }
    }

    static async getStockById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const intId = parseInt(id, 10);
        if (isNaN(intId)) {
            res.status(400).json({ error: "ID de stock inválido" });
            return;
        }
        try {
            const { data, error } = await supabase
                .from("stock")
                .select("*")
                .eq("id_stock", intId)
                .single();
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al obtener el stock" });
        }
    }
}
