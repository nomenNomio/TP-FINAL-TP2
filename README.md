# TP-FINAL-TP2


# INICIO 

Clonar el Repositorio.

Correr el comando `npm i`

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

# RUTAS

## Rutas Game

#### GET /game/
devuelve todos los juegos

#### POST /game/
crea un juego

#### DELETE /game/
borra un juego pasando el titulo por el body


## Rutas User

#### POST /user/
crea un usuario

#### POST /user/me
hace el login


#### Para Todo Esto Hay que Loguearse

#### GET /user/
devuelve todos los usuarios, necesitas estar logueado como admin

#### GET /user/favourite
devuelve todos los juegos favoritos del usuario logueado

#### GET /user/me
devuelve los datos de la cookie

#### GET /user/:id
devuelve un usuario pasado por id


#### POST /user/buygame
compra la cantidad de juegos pasada en el body

#### POST /user/claimgame
reclama un juego ya comprado


#### PUT /user/
actualiza el usuario de la cookie

#### PUT /user/favourite
pone el juego pasado en el body como favorito si no lo estaba y viceversa


#### DELETE /user/
borra un usuario pasado en el body