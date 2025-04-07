import { pool } from "../db.js";

// -- crm.bitacora_evento definition

// CREATE TABLE `bitacora_evento` (
//   `idbitacora` int(11) NOT NULL AUTO_INCREMENT,
//   `idevento` int(11) NOT NULL,
//   `iddependencia` varchar(150) DEFAULT NULL,
//   `tipo` varchar(45) DEFAULT NULL,
//   `fecha_movto` date DEFAULT NULL,
//   `accion` varchar(250) DEFAULT NULL,
//   `login` varchar(45) DEFAULT NULL,
//   PRIMARY KEY (`idbitacora`,`idevento`),
//   KEY `fpk5_idx` (`idevento`),
//   CONSTRAINT `fpk5` FOREIGN KEY (`idevento`) REFERENCES `eventos` (`idevento`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

export const getBitacora_eventos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM bitacora_evento WHERE tipo = 'PENDIENTE' ORDER BY idbitacora ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBitacora_evento = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM bitacora_evento WHERE idbitacora = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Evento no encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function insertBitacoraEvento({ idevento, iddependencia, tipo, accion, login }) {
  const [result] = await pool.query(
    "INSERT INTO bitacora_evento (idevento, iddependencia, tipo, fecha_movto, accion, login) VALUES (?, ?, ?, NOW(), ?, ?)",
    [idevento, iddependencia, tipo, accion, login]
  );
  return result.insertId;
}


export const createBitacora_evento = async (req, res) => {
  try {
    const { idevento, iddependencia, tipo, accion, login } = req.body;
    const idbitacora = await insertBitacoraEvento({ idevento, iddependencia, tipo, accion, login });
    // const [result] = await pool.query(
    //   "INSERT INTO bitacora_evento (idevento, iddependencia, tipo, fecha_movto, accion, login) VALUES (?, ?, ?, now(), ?, ?)",
    //   [idevento, iddependencia, tipo, fecha_movto, accion, login]
    // );
    res.json({
      idbitacora,
      idevento,
      iddependencia,
      tipo,
      accion,
      login
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const updateBitacora_evento = async (req, res) => {
  try {
    const result = await pool.query("UPDATE bitacora_evento SET ? WHERE idbitacora = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBitacora_evento = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM bitacora_evento WHERE idbitacora = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Evento no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
