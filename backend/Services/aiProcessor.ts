import { CONFIG } from "../src/utils/n8n";
import fs from 'fs/promises';

export const extraerTitulo = async (file: Express.Multer.File): Promise<string> => {
    try {
        // Leer el archivo en buffer
        const fileBuffer = await fs.readFile(file.path);
        // Convertir buffer a base64
        const base64Image = fileBuffer.toString('base64');

        // Crear payload JSON con el nombre y la imagen en base64
        const payload = {
            filename: file.originalname,
            mimetype: file.mimetype,
            data: base64Image
        };

        const respuesta = await fetch(CONFIG.n8n.WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
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
};
