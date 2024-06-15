import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Language extends Model {}

Language.init(
  {
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Language",
  }
);

export default Language;