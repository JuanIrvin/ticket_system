import { Router } from "express";
import { obtenerBitacorasEvento, 
    obtenerBitacoraEvento, 
    crearBitacorasEvento, 
    actualizarBitacoraEvento, 
    eliminarBitacoraEvento } from "../controllers/bitacora_evento.controllers.js";

const router = Router();

router.get("/api/bitacoras", obtenerBitacorasEvento);

router.get("/api/bitacoras/:id", obtenerBitacoraEvento);

router.post("/api/bitacoras", crearBitacorasEvento);

router.put("/api/bitacoras/:id", actualizarBitacoraEvento);

router.delete("/api/bitacoras/:id", eliminarBitacoraEvento);

export default router;