import { Libro } from "../Models/Libro";
import { Request, Response } from "express";
import { supabase } from "../src/Config/supabase";

export class LibroController {
    static async getLibro(req: Request, res: Response): Promise<void> {
        try {
            const { data, error } = await supabase.from("libro").select("*");
            if (error) throw error;
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Fallo al obtener clientes" });
        }
    }


    static async getLibroId(req: Request, res: Response):Promise<void>{
        const {id}=req.params
        try{
            const {data,error}=await supabase
            .from("libro")
            .select("*")
            .eq("id_libro",id)
            .single()
            if(error) throw error
            res.status(200).json({data:data,message:"Libro obtenido correctamente"})
        }catch(error){
            console.log(error)
            res.status(500).json({error:"fallo al obtener el libro"})
        }
    }
    static async getLibroPorTitulo(req: Request, res: Response): Promise<void> {
    const { titulo } = req.params;
    try {
        const { data, error } = await supabase
            .from("libro")
            .select("*")
            .ilike("titulo", `%${titulo}%`);  
        
        if (error) throw error;
        
        if (data && data.length === 0) {
            res.status(404).json({ message: "No se encontraron libros con ese título" });
        } else {
            res.status(200).json({ data: data, message: "Libros encontrados" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al buscar libros por título" });
    }
    }
    static async getLibroPorGenero(req: Request, res: Response): Promise<void> {
    const { genero } = req.params;
    try {
        const { data, error } = await supabase
            .from("libro")
            .select("*")
            .ilike("genero", `%${genero}%`);  
        
        if (error) throw error;

        if (data && data.length === 0) {
            res.status(404).json({ 
                message: `No se encontraron libros del género '${genero}'` 
            });
        } else {
            res.status(200).json({ 
                data: data, 
                message: `Libros del género '${genero}' encontrados` 
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            error: "Error al buscar libros por género" 
        });
    }
}
}



