import { pool } from "../db.js";

// bitacora_evento
// - idbitacora (int) autoincrement
// - idevento (int)
// - iddependencia (varchar 150)
// - tipo (varchar 45)
// - fecha_movto (date)
// - accion (varchar 250)
// - login (varchar 45)

export const obtenerBitacorasEvento = async (req, res) => {
  try{
    const [result] = await pool.query("SELECT * FROM bitacora_evento")
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error conectando a la base de datos");
  }
}

export const obtenerBitacoraEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM bitacora_evento WHERE idbitacora = ?", [id]) 
    res.json(result[0]);
  }catch (error) {
    console.error(error);
    res.status(500).send("Error conectando a la base de datos");
  }
}

export const crearBitacorasEvento = async (req, res) => {
  try{
    const { title, description } = req.body;
    const [result] = await pool.query("INSERT INTO bitaco_evento (idbitacora, idevento, iddependencia, tipo, fecha_movto, accion, login) VALUES (0, ?, ?, ?, ?, ?, ?)", [idevento, iddependencia, tipo, fecha_movto, accion, login]);
    res.json({
      idbitacora: result.insertId,
      idevento,
      iddependencia,
      tipo,
      fecha_movto,
      accion,
      login
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error conectando a la base de datos");
  }
}

export const actualizarBitacoraEvento = async (req, res) => {
  try{
    const { id } = req.params;
    const body = req.body;
    const [result] = await pool.query("UPDATE bitaco_evento SET ? WHERE id = ?", [body, id])
    if (result.affectedRows === 0) {
      res.status(404).send("Event not found");
      return;
    }
    res.json("Updated Events: " + result.affectedRows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error connecting to database");
  }
}

export const eliminarBitacoraEvento = async (req, res) => {
  try{
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM bitaco_evento WHERE id = ?", [id])
    if (result.affectedRows === 0) {
      res.status(404).send("Bitacora no encontrada");
      return;
    }
    res.status(204).json({message: "Bitacoras eliminadas: " + result.affectedRows});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error conectando a la base de datos");
  }
}