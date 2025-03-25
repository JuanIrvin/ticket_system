import { pool } from "../db.js";

export const getEventos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM eventos WHERE tipo = 'PENDIENTE' ORDER BY idevento ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEvento = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM eventos WHERE idevento = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Evento no encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createEvento = async (req, res) => {
  try {
    const { idmunicipio, iddependencia, fecha, tipo, problema, ubicacion, vecino, contacto_vecino, foto, login } = req.body;
    const [result] = await pool.query(
      "INSERT INTO eventos (idmunicipio, iddependencia, fecha, tipo, problema, ubicacion, vecino, contacto_vecino, foto, fecha_movto, login) VALUES (?, ?, now(), ?, ?, ?, ?, ?, ?, now(), ?)",
      [idmunicipio, iddependencia, fecha, tipo, problema, ubicacion, vecino, contacto_vecino, foto, login]
    );
    res.json({
      idevento: result.insertId,
      idmunicipio,
      iddependencia,
      fecha: result.fecha,
      tipo,
      problema,
      ubicacion,
      vecino,
      contacto_vecino,
      foto,
      fecha_movto: result.fecha_movto,
      login
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEvento = async (req, res) => {
  try {
    const result = await pool.query("UPDATE eventos SET ?, fecha = now() WHERE idevento = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEvento = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM eventos WHERE idevento = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Evento no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
