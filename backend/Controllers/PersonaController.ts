import { error } from "console";
import { supabase } from "../src/Config/supabase";

import { Persona } from "../Models/Persona";



import { Request,Response } from "express";

export const PersonaController={
    //get persona 
    async getPersona(req:Request,res:Response){
        try{
            const {data,error}= await supabase.from('persona').select('*')
            if(error) throw error
            res.status(200).json(data)
        }catch(e){
            console.error(e)
            res.status(500).json({error:"Fallo al obtener personas"})
        }
    }
    
}