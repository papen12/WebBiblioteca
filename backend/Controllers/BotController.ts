import { Request, Response } from "express";
import { extraerTitulo } from "../Services/aiProcessor";
import { deleteFile } from "../src/utils/file";
import { CONFIG } from "../src/utils/n8n";

export class BotController {
    static async procesarImagen(req: Request, res: Response): Promise<void> {
        if (!req.file) {
            res.status(400).json({
                error: 'Portada requerida',
                tiposPermitidos: CONFIG.SERVER.ALLOWED_MIME_TYPES
            });
            return;
        }
        
        try {
            const title = await extraerTitulo(req.file);
            await deleteFile(req.file.path);

            res.json({
                resultado: true,
                data: {
                    nombre: req.file.originalname,
                    titulo: title.trim()
                }
            });
        } catch (error: any) {
            await deleteFile(req.file.path);
            
            res.status(500).json({
                error: 'Fallo en extracción de título',
                details: process.env.NODE_ENV === 'development' ? error.message : null
            });
        }
    }
}