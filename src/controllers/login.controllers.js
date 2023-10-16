import { pool } from "../db.js";
import { validationResult } from 'express-validator';

// Lógica para autenticación de usuarios y clientes del sistema
export const Login = async (req, res) => {
    // Manejar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rol, identificación, contraseña } = req.body;

  try {
    let query;
    let params;

    if (rol === 'Cliente') {
      query = "SELECT * FROM cliente WHERE identificación = ? AND contraseña = ?";
      params = [identificación, contraseña];
    } else {
      query = "SELECT * FROM usuario WHERE identificación = ? AND contraseña = ? AND rol = ?";
      params = [identificación, contraseña, rol];
    }

    const [rows] = await pool.query(query, params);

    if (rows.length <= 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.json({ message: "Inicio de sesión exitoso", user: rows[0] });
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};