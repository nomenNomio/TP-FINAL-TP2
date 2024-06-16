import express from "express";
import routes from "./routes/routes.js";
import morgan from "morgan";
import connection from "./connection/connection.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import {Tag} from "./Models/models.js"
import { SERVER_PORT } from "./config/config.js";

import { seeds } from "./seed/seeds.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

app.use(routes);

app.use((req, res) => {
  res.status(404).send({ success: false, message: "not found" });
});

await connection.sync({force:true})

//generar las tablas iniciales (seeds)
await seeds();
//generar las tablas iniciales (seeds)

console.log("\nBase de datos conectada y funcionando\n---------------------------------\n");

app.listen(SERVER_PORT, () => {
  console.log(`El servidor fue lanzado y escucha en: http://localhost:8080\n---------------------------------\n`);
});