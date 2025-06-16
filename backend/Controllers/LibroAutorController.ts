import { Request, Response } from "express";
import { supabase } from "../src/Config/supabase";

export class LibroAutorController {
    static async getLibrosConAutoresYSinopsis(req: Request, res: Response): Promise<void> {
        try {
            const { data, error } = await supabase
                .from('libro')
                .select(`
                    titulo,
                    sinopsis,
                    libro_autor(id_autor, autor(nombre))
                `);

            if (error) throw error;

            const result = data.map(libro => ({
                titulo: libro.titulo,
                sinopsis: libro.sinopsis,
                autores: libro.libro_autor.map((la: any) => la.autor.nombre)
            }));

            res.status(200).json(result);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error al obtener datos de libros' });
        }
    }

    static async getAutoresBio(req: Request, res: Response): Promise<void> {
        try {
            const { data, error } = await supabase
                .from('autor')
                .select(`
                    nombre,
                    biografia,
                    fecha_nac,
                    fecha_muerte,
                    nacionalidad
                `)
                .order('nombre', { ascending: true });

            if (error) throw error;
            const autores = data.map(autor => ({
                nombre: autor.nombre,
                biografia: autor.biografia,
                fecha_nacimiento: autor.fecha_nac,
                fecha_muerte:autor.fecha_muerte,
                nacionalidad: autor.nacionalidad
            }));

            res.status(200).json(autores);
        } catch (error) {
            console.error('Error al obtener biografías de autores:', error);
            res.status(500).json({ 
                error: 'Error al obtener biografías de autores',
                details: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }
}