# TP-FINAL-TP2

El tp final de TP 2

# INICIO 

Clonar el Repo

Hacer npm i

Usamos SQL Server, nos conectamos a un usuario con permisos sacados de un archivo .env

Para iniciar usar el comando "npm run startBack" (Fijarse que este corriendo la base de datos)

La app inicia desde el index.js y se agarran los datos del .env

Con los imports se llaman todos los inits y se inicia el modelo

Despues se cargan las rutas

Por ultimo se vincula con la base de datos y se lanza el server

# CREACION DE UN JUEGO

Una vez se lanza el server este esta a la disposicion de las consultas

En la ruta "/game/" con el verbo POST se crea un juego

Se le han de pasar los parametros en forma de objeto json como requiere el model "Game.js"

Esos parametros entran en el metodo "createGame" de "GameController.js"

Y de ahí pasan a "Game.js" que sobreescribe el metodo "create"

En "Game.js" se crea el juego y las relaciones de este, que fueron importadas de "models.js" donde se definen todas las relaciones

Se devuelve el juego y se envia.