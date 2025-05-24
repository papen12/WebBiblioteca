import { Request, Response } from "express";
import { supabase } from "../src/Config/supabase";
import { ReservaFunc } from "../Models/Reserva";

export class ReservaController {
    static async getReservas(req: Request, res: Response): Promise<void> {
        try {
            const { data, error } = await supabase.from("reserva").select("*");
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al obtener reservas" });
        }
    }

    static async getReservaById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const intId = parseInt(id, 10);
        if (isNaN(intId)) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }
        try {
            const { data, error } = await supabase
                .from("reserva")
                .select("*")
                .eq("id_reserva", intId)
                .single();
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al obtener la reserva" });
        }
    }

    static async createReserva(req: Request, res: Response): Promise<void> {
        const nuevaReserva: ReservaFunc = req.body;
        try {
            const { data, error } = await supabase
                .from("reserva")
                .insert(nuevaReserva)
                .single();
            if (error) throw error;
            res.status(201).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al crear la reserva" });
        }
    }

    static async updateReserva(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const intId = parseInt(id, 10);
        const actualizar: ReservaFunc = req.body;

        if (isNaN(intId)) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }

        try {
            const { data, error } = await supabase
                .from("reserva")
                .update(actualizar)
                .eq("id_reserva", intId);
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al actualizar la reserva" });
        }
    }

    static async deleteReserva(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const intId = parseInt(id, 10);

        if (isNaN(intId)) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }

        try {
            const { error } = await supabase
                .from("reserva")
                .delete()
                .eq("id_reserva", intId);
            if (error) throw error;
            res.status(200).json({ mensaje: "Reserva eliminada exitosamente" });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al eliminar la reserva" });
        }
    }
}
