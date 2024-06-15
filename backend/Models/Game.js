import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import Image from "./Image.js";

class Game extends Model {}

Game.init(
  {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        isNumeric: true,
        min: 0,
    },
    launchDate: {
        type: DataTypes.DATE,
        allowNull: false,
        isDate: true,   
    },
/*     franchising: {
        type: DataTypes.STRING,
        allowNull: true,
    }, */
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
        isUrl: true, 
    },
    gamePlay: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.DECIMAL(5, 1),
        allowNull: true,
        min: 0,
        max: 10,
    },
  },
  {
    sequelize: connection,
    modelName: "Game",
  }
);


export default Game;