import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class UserGame extends Model {}

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