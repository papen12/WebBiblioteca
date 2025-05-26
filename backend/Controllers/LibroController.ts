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

    static async getLibroTitulo(req: Request, res: Response):Promise<void>{
        const {tittle}=req.params
        console.log(tittle)
        try{
            const {data, error}=await supabase
            .from("libro")
            .select("*")
            .ilike("titulo", `%${tittle}%`)
            if(error) throw error
            res.status(200).json({data:data,message:"Libro obtenido correctamente"})
        }catch(error){
            console.log(error)
            res.status(500).json({error:"fallo al obtener el libro"})
        }
    }
    
    static async getLirboIsbn(req: Request, res: Response):Promise<void>{
        
    }

}


