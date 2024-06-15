import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Developer extends Model {}

Developer.init(
  {
    Developer: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isAlphanumeric: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Developer",
  }
);

export default Developer;