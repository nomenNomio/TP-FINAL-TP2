import { Sequelize } from "sequelize";
import {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_PORT,
} from "../config/config.js"


const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host:DB_HOST,
  dialect:DB_DIALECT,
  port:DB_PORT,
});

try {
  console.log("Inicio el programa\n---------------------------------\n")
  await connection.authenticate();
  console.log('Se realizo la conexion con la base de datos con exito.');
} catch (error) {
  console.error('No se pudo conectar con la base de datos:', error);
}

export default connection;