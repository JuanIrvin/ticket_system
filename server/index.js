import express from "express";
import { PORT } from "./config.js";

import bitacora_evento from "./routes/bitacora_evento.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bitacora_evento);

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`)