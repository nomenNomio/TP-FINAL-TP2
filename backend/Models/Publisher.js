import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Publisher extends Model {}

Publisher.init(
  {
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isAlphanumeric: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Publisher",
  }
);

export default Publisher;