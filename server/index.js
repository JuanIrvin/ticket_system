import express from "express";
import cors from "cors";
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import { PORT } from "./config.js";

import eventosRoutes from "./routes/eventos.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)

app.use(cors());
app.use(express.json());

app.use(eventosRoutes);

app.use(express.static(join(__dirname, '../client/dist')))

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
