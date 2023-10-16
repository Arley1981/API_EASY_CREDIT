import { pool } from "../db.js";

// obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM usuario");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  // Obtener un usuario
  export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  // Eliminar un usuario
  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("DELETE FROM usuario WHERE id_usuario = ?", [id]);
  
      if (rows.affectedRows <= 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  // Crear un usuario
  export const createUser = async (req, res) => {
    try {
      const {  rol, nombres, apellidos, identificación, contraseña, telefono, email, dirección, edad  } = req.body;
      const [rows] = await pool.query(
        "INSERT INTO usuario ( rol, nombres, apellidos, identificación, contraseña, telefono, email, dirección, edad ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [ rol, nombres, apellidos, identificación, contraseña, telefono, email, dirección, edad]
      );
      res.status(201).json({ id: rows.insertId,  rol, nombres, apellidos, identificación, contraseña, telefono, email, dirección, edad });
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  // Actualizar un usuario
  export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { rol, nombres, apellidos, identificación, contraseña, telefono, email, dirección, edad } = req.body;
  
      const [result] = await pool.query(
        "UPDATE usuario SET rol = IFNULL(?, rol), nombres = IFNULL(?, nombres), apellidos = IFNULL(?, apellidos), identificación = IFNULL(?, identificación), contraseña = IFNULL(?, contraseña), telefono = IFNULL(?, telefono), email = IFNULL(?, email), dirección = IFNULL(?, dirección), edad = IFNULL(?, edad) WHERE id_usuario = ?",
        [rol, nombres, apellidos, identificación, contraseña, telefono, email, dirección, edad, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "User not found" });
  
      const [rows] = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  