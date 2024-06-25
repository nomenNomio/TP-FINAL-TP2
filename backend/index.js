import express from "express";
import routes from "./routes/routes.js";
import morgan from "morgan";
import connection from "./connection/connection.js";
import cors from "cors"
import cookieParser from "cookie-parser";

import { SERVER_PORT } from "./config/config.js";

import { seeds } from "./seed/seeds.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

//importar las rutas
app.use(routes);

//si no encuentra la ruta manda un 404
app.use((req, res) => {
  res.status(404).send({ success: false, message: "not found" });
});

//connectar con la DB
await connection.sync({force:true});

//generar las tablas iniciales (seeds)
await seeds();


console.log("\n", "Base de datos conectada y funcionando");
console.log("\n---------------------------------\n");

app.listen(SERVER_PORT, () => {
  console.log(`El servidor fue lanzado y escucha en: http://localhost:${SERVER_PORT}`);
  console.log("\n---------------------------------\n");
});