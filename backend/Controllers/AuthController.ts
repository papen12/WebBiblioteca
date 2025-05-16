import { Request, Response } from 'express';
import { supabase } from '../src/Config/Supabase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const AuthController = {
    login: async (req: Request, res: Response) => {
        try {
            const { usuario, contrasena } = req.body;
            const { data: cliente, error } = await supabase
                .from('cliente')
                .select('*')
                .eq('usuario', usuario)
                .single();
            if (error || !cliente) throw new Error('Usuario no encontrado');
            const validPassword = await bcrypt.compare(contrasena, cliente.password);
            if (!validPassword) throw new Error('Contraseña incorrecta');
            const token = jwt.sign(
                { clienteId: cliente.cl_cliente, usuario: cliente.usuario },
                process.env.JWT_SECRET!,
                { expiresIn: '8h' }
            );
            res.json({ token, user: cliente });
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }
};