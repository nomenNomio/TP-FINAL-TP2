import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Genre extends Model {}

Genre.init(
  {
    Genre: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      primaryKey: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Genre",
  }
);

export default Genre;