import { pool } from "../db.js";

/*// obtener todos los clientes sin cuenta
export const getClients = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM cliente");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };*/

  // Obtener todos los clientes con su estado de cuenta y saldo
export const getClients = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT c.*, cc.estado, cc.saldo FROM cliente c LEFT JOIN cuenta_credito cc ON c.id_cliente = cc.id_cliente");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  /*// Obtener un Cliente sin cuenta
  export const getClient = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM cliente WHERE id_cliente = ?", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Client not found" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };*/

  // Obtener un Cliente con su estado de cuenta y saldo
export const getClient = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT c.*, cc.estado, cc.saldo FROM cliente c LEFT JOIN cuenta_credito cc ON c.id_cliente = cc.id_cliente WHERE c.id_cliente = ?", [id]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Client not found" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

  // Eliminar un cliente (y su cuenta si el saldo es menor o igual a cero)
export const deleteClient = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verificar el saldo de la cuenta
      const [accountRows] = await pool.query("SELECT saldo FROM cuenta_credito WHERE id_cliente = ?", [id]);
  
      if (accountRows.length <= 0) {
        return res.status(404).json({ message: "Account not found" });
      }
  
      const saldo = accountRows[0].saldo;
  
      if (saldo > 0) {
        return res.status(400).json({ message: "Client cannot be deleted. Account balance is greater than zero." });
      }
  
      await pool.query("DELETE FROM cuenta_credito WHERE id_cliente = ?", [id]);
      const [result] = await pool.query("DELETE FROM cliente WHERE id_cliente = ?", [id]);
  
      if (result.affectedRows <= 0) {
        return res.status(404).json({ message: "Client not found" });
      }
  
      res.status(200).json({ message: "Cliente y cuenta eliminados satisfactoriamente" });
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  // Crear un Cliente y Asociar una Cuenta de Crédito
export const createClient = async (req, res) => {
    try {
      const { nombres, apellidos, identificación, contraseña, telefono, email, dirección, edad } = req.body;
  
      const [rows] = await pool.query(
        "INSERT INTO cliente (nombres, apellidos, identificación, contraseña, telefono, email, dirección, edad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [nombres, apellidos, identificación, contraseña, telefono, email, dirección, edad]
      );
  
      const clientId = rows.insertId;
  
      // Ahora creamos una cuenta de crédito asociada al cliente
      await pool.query(
        "INSERT INTO cuenta_credito (id_cliente, estado, saldo ) VALUES (?, ?, ?)",
        [clientId,'paz y salvo', 0 ]
      );
  
      res.status(201).json({ id: clientId, nombres, apellidos, identificación, contraseña, telefono, email, dirección, edad });
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  // Actualizar un Cliente
  export const updateClient = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombres, apellidos, identificación, contraseña, telefono, email, dirección, edad } = req.body;
  
      const [result] = await pool.query(
        "UPDATE cliente SET nombres = IFNULL(?, nombres), apellidos = IFNULL(?, apellidos), identificación = IFNULL(?, identificación), contraseña = IFNULL(?, contraseña), telefono = IFNULL(?, telefono), email = IFNULL(?, email), dirección = IFNULL(?, dirección), edad = IFNULL(?, edad) WHERE id_cliente = ?",
        [ nombres, apellidos, identificación, contraseña, telefono, email, dirección, edad, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Client not found" });
  
      const [rows] = await pool.query("SELECT * FROM cliente WHERE id_cliente = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };