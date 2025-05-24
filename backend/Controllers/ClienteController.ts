import { Request, Response } from "express";
import { supabase } from "../src/Config/supabase";
import { ClienteFunc } from "../Models/Cliente";

export class ClienteController {
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { data, error } = await supabase.from("cliente").select("*");
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: "Error al obtener clientes" });
        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        const { ci } = req.params;
        try {
            const { data, error } = await supabase
                .from("cliente")
                .select("*")
                .eq("ci_cliente", ci)
                .single();
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: "No se encontró el cliente" });
        }
    }

    static async create(req: Request, res: Response): Promise<void> {
        const newClient: ClienteFunc = req.body;
        try {
            const { data, error } = await supabase
                .from("cliente")
                .insert(newClient)
                .single();
            if (error) throw error;
            res.status(201).json(data);
        } catch (e) {
            res.status(500).json({ error: "No se pudo crear el cliente" });
        }
    }

    static async update(req: Request, res: Response): Promise<void> {
        const { ci } = req.params;
        const updateData: ClienteFunc = req.body;
        try {
            const { data, error } = await supabase
                .from("cliente")
                .update(updateData)
                .eq("ci_cliente", ci);
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ error: "No se pudo actualizar" });
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        const { ci } = req.params;
        try {
            const { error } = await supabase
                .from("cliente")
                .delete()
                .eq("ci_cliente", ci);
            if (error) throw error;
            res.status(200).json({ mensaje: "Cliente eliminado" });
        } catch (e) {
            res.status(500).json({ error: "No se pudo eliminar" });
        }
    }
}
