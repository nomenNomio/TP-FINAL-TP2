import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Tag extends Model {}

Tag.init(
  {
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connection,
    modelName: "Tag",
  }
);

export default Tag;