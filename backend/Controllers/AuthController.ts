import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../src/utils/jwt";
import { supabase } from "../src/Config/supabase";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { usuario, password, email, nombre, apellido, cl_usuario, id_rol } = req.body;
      const { data: existe, error: errorExiste } = await supabase
        .from("usuario")
        .select("*")
        .or(`usuario.eq.${usuario},email.eq.${email},cl_usuario.eq.${cl_usuario}`)
        .single();

      if (existe) return res.status(400).json({ error: "Usuario ya existe" });
      if (errorExiste && errorExiste.code !== "PGRST116") {
        return res.status(500).json({ error: "Error al verificar usuario" });
      }
      const hashed = await bcrypt.hash(password, 10);

      const { data, error } = await supabase
        .from("usuario")
        .insert([
          {
            usuario,
            password: hashed,
            email,
            nombre,
            apellido,
            cl_usuario,
            id_rol,
          },
        ])
        .select()
        .single();

      if (error) return res.status(500).json({ error: error.message });

      res.status(201).json({ message: "Usuario registrado", usuario: data });
    } catch (error) {
      res.status(500).json({ error: "Error en el registro" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { usuario, password } = req.body;

      const { data: user, error } = await supabase
        .from("usuario")
        .select("*")
        .eq("usuario", usuario)
        .single();

      if (error || !user) return res.status(400).json({ error: "Credenciales inválidas" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Credenciales inválidas" });

      const token = generateToken({ id: user.id_usuario, usuario: user.usuario, rol: user.id_rol });

      res.json({ token, user: { id: user.id_usuario, usuario: user.usuario, rol: user.id_rol } });
    } catch (error) {
      res.status(500).json({ error: "Error en el login" });
    }
  }

  static async profile(req: Request, res: Response) {
    const user = (req as any).user;
    res.json({ message: "Perfil de usuario autenticado", user });
  }
}
