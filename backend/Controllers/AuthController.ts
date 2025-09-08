import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../src/utils/jwt";
import { supabase } from "../src/Config/supabase";

export class AuthController {
  static register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        usuario,
        password,
        email,
        nombre,
        apellido,
        cl_usuario,
        telefono,
        direccion,
        genero,
        fecha_nac,
        foto,
      } = req.body;
      if (!usuario || !password || !email || !nombre || !apellido || !cl_usuario) {
        res.status(400).json({ error: "Faltan campos obligatorios" });
        return;
      }
      const { data: existeData, error: errorExiste } = await supabase.rpc("existe_usuario", {
        p_usuario: usuario,
        p_email: email,
        p_cl_usuario: cl_usuario
      });

      if (errorExiste) {
        res.status(500).json({ error: "Error al verificar existencia de usuario" });
        return;
      }

      if (existeData?.[0]?.existe) {
        res.status(400).json({ error: "Usuario ya existe", usuario: existeData[0] });
        return;
      }
      const hashed = await bcrypt.hash(password, 10);
      const { data, error } = await supabase.rpc("registrar_usuario", {
        p_cl_usuario: cl_usuario,
        p_usuario: usuario,
        p_password: hashed,
        p_nombre: nombre,
        p_apellido: apellido,
        p_email: email,
        p_telefono: telefono ?? null,
        p_direccion: direccion ?? null,
        p_genero: genero ?? null,
        p_fecha_nac: fecha_nac ?? null,
        p_foto: foto ?? null
      });

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.status(201).json({ message: "Usuario registrado", usuario: data });

    } catch (error) {
      res.status(500).json({ error: "Error en el registro" });
    }
  };

  static login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usuario, password } = req.body;

      const { data: user, error } = await supabase
        .from("usuario")
        .select("*")
        .eq("usuario", usuario)
        .single();

      if (error || !user) {
        res.status(400).json({ error: "Credenciales inválidas" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ error: "Credenciales inválidas" });
        return;
      }

      const token = generateToken({ id: user.id_usuario, usuario: user.usuario, rol: user.id_rol });

      res.json({ token, user: { id: user.id_usuario, usuario: user.usuario, rol: user.id_rol } });
    } catch (error) {
      res.status(500).json({ error: "Error en el login" });
    }
  };

  static profile: RequestHandler = (req: Request, res: Response): void => {
    const user = (req as any).user;
    res.json({ message: "Perfil de usuario autenticado", user });
  };
}
