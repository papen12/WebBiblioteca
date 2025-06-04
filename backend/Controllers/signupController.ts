import { Request, Response } from "express";
import { supabase } from "../src/Config/supabase";
import { Cliente } from "../Models/Cliente";
import { PersonaFunc, Persona } from "../Models/Persona";

export class SignupController {
  static async signUp(req: Request, res: Response): Promise<void> {
    const personaData: PersonaFunc = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      genero: req.body.genero
    };

    const clienteData: Omit<Cliente, "idPersona"> = {
      ci_cliente: req.body.ci_cliente,
      usuario: req.body.usuario,
      password: req.body.password
    };
    if (!personaData.nombre || !personaData.apellido || !personaData.email || 
        !clienteData.ci_cliente || !clienteData.usuario || !clienteData.password) {
      res.status(400).json({ error: "Faltan datos obligatorios" });
      return;
    }

    try {
      const { data: newPersona, error: personaError } = await supabase
        .from("persona")
        .insert(personaData)
        .select("id_persona")
        .single();

      if (personaError || !newPersona) {
        console.error("Error en inserción de persona:", personaError);
        res.status(400).json({ 
          error: "Error al crear persona",
          details: personaError?.message || "No se devolvieron datos"
        });
        return;
      }
      const completeClienteData: Cliente = {
        ...clienteData,
        idPersona: newPersona.id_persona
      };

      const { data: newCliente, error: clienteError } = await supabase
        .from("cliente")
        .insert({
          ci_cliente: completeClienteData.ci_cliente,
          id_persona: completeClienteData.idPersona,
          usuario: completeClienteData.usuario,
          password: completeClienteData.password
        })
        .select()
        .single();

      if (clienteError || !newCliente) {
        await supabase
          .from("persona")
          .delete()
          .eq("id_persona", newPersona.id_persona);

        res.status(400).json({ 
          error: "El nombre del usuario ya existe intente nuevamente",
          details: clienteError?.message || "No se devolvieron datos"
        });
        return;
      }
      res.status(201).json({ 
        message: "Cliente creado exitosamente",
        cliente: newCliente,
        persona: newPersona
      });

    } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).json({ 
        error: "Error en el servidor",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  }

  static async getCliente(req: Request, res: Response): Promise<void> {
    try {
      const { data, error } = await supabase
        .from("cliente")
        .select(`
          *,
          persona: id_persona (*)
        `);

      if (error) throw error;
      res.status(200).json(data);
    } catch (e) {
      console.error("Error al obtener clientes:", e);
      res.status(500).json({ 
        error: "Fallo al obtener clientes",
        details: e instanceof Error ? e.message : String(e)
      });
    }
  }
}