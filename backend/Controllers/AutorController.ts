import { Request, Response } from "express";
import { supabase } from "../src/Config/supabase";

export class AutorController {
  static async getAutor(req: Request, res: Response): Promise<void> {
    try {
      const { data, error } = await supabase.rpc("get_autores");
      if (error) throw error;
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Fallo al obtener los autores" });
    }
  }

  static async getAutorById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const intId = parseInt(id, 10);

    if (isNaN(intId)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    try {
      const { data, error } = await supabase.rpc("get_autor_by_id", { p_id: intId });
      if (error) throw error;
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Fallo al obtener autor por ID" });
    }
  }
  static async getPorNombre(req: Request, res: Response): Promise<void> {
    const { nombre } = req.params;

    try {
      const { data, error } = await supabase.rpc("get_autor_por_nombre", { p_nombre: nombre });
      if (error) throw error;

      if (!data || data.length === 0) {
        res.status(404).json({
          message: `No se encontraron autores con el nombre "${nombre}"`
        });
      } else {
        res.status(200).json({
          data,
          message: `Autores con el nombre "${nombre}" encontrados`
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Error al buscar autores por nombre"
      });
    }
  }
}
