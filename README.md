# TP-FINAL-TP2

# PREREQUISITOS

Este proyecto utiliza Sequelize con SQL Server.

Si se quiere utilizar otra base de datos se tiene que descargar la libreria correspondiente.

Hay que crear un usuario en SQL Server con permisos suficientes en una tabla.

En base a eso hay que hacer un archivo `.env` con el siguiente formato:

```
SERVER_PORT=<"El puerto donde se lanza el server">
DB_NAME=<"El nombre de la base de datos">
DB_USER=<"El nombre del usuario">
DB_PASSWORD=<"La contraseña del usuario">
DB_HOST=<"El host (ej: localhost)">
DB_DIALECT=<"El dialecto que utiliza la base de datos">
DB_PORT=<"El puerto en el que escucha la base de datos">
SECRET=<"un SECRET que se utiliza para salar contraseñas">
```

# INICIO 

Clonar el Repositorio.

Correr el comando `npm i`.

Para iniciar usar el comando "npm run startBack" (Fijarse que este corriendo la base de datos).

La app inicia desde el index.js y se agarran los datos del .env.

Con los imports se llaman todos los inits y se inicia el modelo.

Se cargan las rutas.

Por ultimo se vincula con la base de datos y se lanza el server.

# RUTAS

## Rutas Game

#### GET /game/
Devuelve todos los juegos.

#### POST /game/
Crea un juego, el formato pasado en el body debe ser:
```
{
    "title": <"Nombre del juego">,
    "description": <"Descripcion">,
    "price": <"Precio, puede ser un numero real">,
    "launchDate": <"Fecha, ej:2012-04-23T18:25:43.511Z">,
    "logo": <"URL">,
    "gamePlay": <"Descripcion del gameplay">,
    "rating": <"Numero real del 1 al 10">,
    "developer": <"El desarrollador">,
    "publisher": <"El distribuidor, puede ser null">,
    "mainImage": {
        "alt": <"Descripcion de la imagen">,
        "url": <"URL">
    },
    "images": [
        {
            "alt": <"Descripcion de la imagen">,
            "url": <"URL">
        },
        {
            "alt": <"Descripcion de la imagen">,
            "url": <"URL">
        },
        ...
    ],
    "categories": [
        <"Categoria_1">,
        <"Categoria_2">,
        ...
    ],
    "requirements": [
        {
            "typeReq": <"El tipo, ej: Minimos, Recomendados, etc.">,
            "operatingSystem": <"Sistema Operativo">,
            "processor": <"Procesador">,
            "memory": <"RAM">,
            "graphics": <"Placa grafica">,
            "storage": <"Almacenamiento">
        },
        {
            "typeReq": <"El tipo, ej: Minimos, Recomendados, etc.">,
            "operatingSystem": <"Sistema Operativo">,
            "processor": <"Procesador">,
            "memory": <"RAM">,
            "graphics": <"Placa grafica">,
            "storage": <"Almacenamiento">
        },
        ...
    ],
    "tags": [
        <"Tag_1">,
        <"Tag_2">,
        ...
    ],
    "languages": [
        <"Idioma_1">,
        <"Idioma_2">,
        <"Idioma_3">,
        ...
    ]
}
```

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


# CREACION DE UN JUEGO

Una vez se lanza el server este esta a la disposicion de las consultas

En la ruta "/game/" con el verbo POST se crea un juego

Se le han de pasar los parametros en forma de objeto json como requiere el model "Game.js"

Esos parametros entran en el metodo "createGame" de "GameController.js"

Y de ahí pasan a "Game.js" que sobreescribe el metodo "create"

En "Game.js" se crea el juego y las relaciones de este, que fueron importadas de "models.js" donde se definen todas las relaciones

Se devuelve el juego y se envia.