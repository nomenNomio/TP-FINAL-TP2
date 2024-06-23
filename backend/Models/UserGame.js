import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import {Sale} from "./models.js";

class UserGame extends Model {
  async faveUnFave({transaction}) {
    this.favourite = !this.favourite;
    await this.save({transaction});
  }

  static async faveUnFave({ UserId, GameTitle }, {transaction}) {

    //busca un juego de usuario y si no es favorito lo pone en favorito y viceversa

    const query = {
      where: {
        UserId,
        GameTitle,
      },
      transaction
    };

    const userGame = await UserGame.findOne(query);
    if(!userGame) throw new Error("No tenes el juego reclamado.");

    await userGame.faveUnFave({transaction});

    return userGame;
  }

  static async create({ UserId, GameTitle }, { transaction }) {

    const userGameQuery = {
      where: {
        UserId,
        GameTitle,
      },
      transaction,
    };
    const existsUserGame = await UserGame.findOne(userGameQuery);

    if (existsUserGame) throw new Error("Ya reclamaste este juego.");

    const saleQuery = {
      where: {
        UserId,
        GameTitle,
      },
      transaction,
    };

    const sale = await Sale.findOne(saleQuery);
    if (!sale) throw new Error("No tenes el juego comprado.");

    if (sale.amount <= 1) {
      //borras la compra cuando ya no hayan más juegos
      await sale.destroy({ transaction });
    } else {
      //al reclamar el juego bajas una a la cantidad de juegos que tenes guardados (que podrias regalar, etc.)
      sale.amount--;
      await sale.save({ transaction });
    }

    //si llegó hasta aca no existe el userGame, lo creas
    const userGameAttributes = { GameTitle, UserId };
    const userGame = await super.create(userGameAttributes, { transaction });

    return userGame;
  }
}

UserGame.init(
  {
    favourite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false,
    },
  },
  {
    sequelize: connection,
    modelName: "UserGame",
  }
);

export default UserGame;