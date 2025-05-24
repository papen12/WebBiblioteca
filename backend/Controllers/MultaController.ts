import { Request, Response } from "express";
import { supabase } from "../src/Config/supabase";
import { MultaFunc } from "../Models/Multa";

export class MultaController {

    static async getMulta(req: Request, res: Response): Promise<void> {
        try {
            const { data, error } = await supabase.from("multa").select("*");
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al obtener las multas" });
        }
    }

    static async getMultaById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const intId = parseInt(id, 10);
        if (isNaN(intId)) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }
        try {
            const { data, error } = await supabase
                .from("multa")
                .select("*")
                .eq("id_multa", intId)
                .single();
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al obtener la multa" });
        }
    }

    static async createMulta(req: Request, res: Response): Promise<void> {
        const { monto, motivo, estado } = req.body;

        if (monto == null || !motivo || !estado) {
            res.status(400).json({ error: "Campos requeridos: monto, motivo, estado" });
            return;
        }

        const nuevaMulta = {
            monto,
            motivo,
            estado,
            fecha_creacion: new Date(),
            fecha_actualizacion: new Date(),
        };

        try {
            const { data, error } = await supabase
                .from("multa")
                .insert(nuevaMulta)
                .select()
                .single();
            if (error) throw error;
            res.status(201).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al crear la multa" });
        }
    }

    static async updateMulta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const intId = parseInt(id, 10);
        const { monto, motivo, estado } = req.body;

        if (isNaN(intId)) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }

        const multaActualizada: Partial<MultaFunc> = {
            ...(monto !== undefined && { monto }),
            ...(motivo !== undefined && { motivo }),
            ...(estado !== undefined && { estado }),
        };

        try {
            const { data, error } = await supabase
                .from("multa")
                .update(multaActualizada)
                .eq("id_multa", intId)
                .select()
                .single();
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al actualizar la multa" });
        }
    }

    static async deleteMulta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const intId = parseInt(id, 10);
        if (isNaN(intId)) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }
        try {
            const { error } = await supabase
                .from("multa")
                .delete()
                .eq("id_multa", intId);
            if (error) throw error;
            res.status(200).json({ mensaje: "Multa eliminada exitosamente" });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al eliminar la multa" });
        }
    }
}
