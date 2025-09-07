import { Request, Response } from "express";
import { supabase } from "../src/Config/supabase";

export class LibroController {

    static async getLibro(req: Request, res: Response): Promise<void> {
        try {
            const { data, error } = await supabase.rpc("get_libros");
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al obtener libros" });
        }
    }

    static async getLibroId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const { data, error } = await supabase.rpc("get_libro_by_id", { p_id: parseInt(id) });
            if (error) throw error;
            res.status(200).json({ data, message: "Libro obtenido correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fallo al obtener el libro" });
        }
    }

    static async getLibroPorTitulo(req: Request, res: Response): Promise<void> {
        const { titulo } = req.params;
        try {
            const { data, error } = await supabase.rpc("get_libros_by_titulo", { p_titulo: titulo });
            if (error) throw error;
            if (!data || data.length === 0) {
                res.status(404).json({ message: "No se encontraron libros con ese título" });
            } else {
                res.status(200).json({ data, message: "Libros encontrados" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al buscar libros por título" });
        }
    }

    static async getLibroPorGenero(req: Request, res: Response): Promise<void> {
        const { genero } = req.params;
        try {
            const { data, error } = await supabase.rpc("get_libros_by_genero", { p_genero: genero });
            if (error) throw error;
            if (!data || data.length === 0) {
                res.status(404).json({ message: `No se encontraron libros del género '${genero}'` });
            } else {
                res.status(200).json({ data, message: `Libros del género '${genero}' encontrados` });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al buscar libros por género" });
        }
    }
    static async getLibroPorIsbn(req: Request, res: Response): Promise<void> {
        const { isbn } = req.params;
        try {
            const { data, error } = await supabase.rpc("get_libro_by_isbn", { p_isbn: isbn });
            if (error) throw error;
            if (!data || data.length === 0) {
                res.status(404).json({ message: `No se encontraron libros con ISBN '${isbn}'` });
            } else {
                res.status(200).json({ data, message: "Libros encontrados por ISBN" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al buscar libros por ISBN" });
        }
    }

}
