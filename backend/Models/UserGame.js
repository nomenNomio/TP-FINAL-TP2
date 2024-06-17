import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class UserGame extends Model {
  async faveUnFave(){
    this.favourite = !this.favourite;
    await this.save();
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