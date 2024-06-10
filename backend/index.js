import express from "express";
//import routes from "./routes/routes.js";
import morgan from "morgan";
import connection from "./connection/connection.js";
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

//app.use(routes);

app.use((req, res) => {
  res.status(404).send({ success: false, message: "not found" });
});

await connection.sync({force:true})

console.log("\nBase de datos conectada y funcionando\n---------------------------------\n");

app.listen(8080, () => {
  console.log(`El servidor fue lanzado y escucha en: http://localhost:8080\n---------------------------------\n`);
});