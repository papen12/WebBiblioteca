import { CONFIG } from "../src";
import fs from 'fs';
import FormData from 'form-data';

export const extraerTitulo = async (file: Express.Multer.File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(file.path), {
        filename: file.originalname,
        contentType: file.mimetype
    });

    try {
        const respuesta = await fetch(CONFIG.n8n.WEBHOOK_URL, {
            method: 'POST',
            body: formData as any,
            headers: formData.getHeaders()
        });
        
        if (!respuesta.ok) {
            const errorText = await respuesta.text();
            console.error(`Error en la petición: ${respuesta.status} - ${errorText}`);
            throw new Error(`Error al procesar la imagen: ${respuesta.statusText}`);
        }

        const { titulo } = await respuesta.json();
        
        if (!titulo) {
            console.warn('La API respondió pero no se detectó título en la imagen');
            return "Título no encontrado";
        }
        
        return titulo;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error en extraerTitulo: ${error.message}`, error.stack);
        } else {
            console.error('Error desconocido en extraerTitulo', error);
        }
        return "No se pudo procesar la imagen para extraer el título";
    }
}