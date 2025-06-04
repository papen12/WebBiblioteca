import { Request, Response } from "express";
import { supabase } from "../src/Config/supabase";

export class SignupController {
  static async signUp(req: Request, res: Response): Promise<void> {
    const {
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      genero,
      ci_cliente,
      usuario,
      password
    } = req.body;

    if (!nombre || !apellido || !email || !telefono || !direccion || !genero || !ci_cliente || !usuario || !password) {
      res.status(400).json({ error: "Faltan datos obligatorios" });
      return;
    }

    try {
      const { data: personaData, error: personaError } = await supabase
        .from("persona")
        .insert({
          nombre,
          apellido,
          email,
          telefono,
          direccion,
          genero,
        })
        .select("id_persona")
        .single();

      if (personaError) {
        res.status(400).json({ error: "Error al crear persona", detalle: personaError.message });
        return;
      }

      if (!personaData) {
        res.status(404).json({ error: "Persona no encontrada después de la inserción" });
        return;
      }

      const { data: clienteData, error: clienteError } = await supabase
        .from("cliente")
        .insert({
          ci_cliente,
          id_persona: personaData.id_persona,
          usuario,
          password,
        })
        .single();

      if (clienteError) {
        res.status(400).json({ error: "Error al crear cliente", detalle: clienteError.message });
        return;
      }

      if (!clienteData) {
        res.status(404).json({ error: "Cliente no encontrado después de la inserción" });
        return;
      }

      res.status(201).json({ message: "Cliente creado exitosamente", cliente: clienteData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
}
