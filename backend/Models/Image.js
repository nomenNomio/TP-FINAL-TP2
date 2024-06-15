import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Image extends Model {}

Image.init(
  {
    alt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        isUrl: true,
        unique: true,

    },
  },
  {
    sequelize: connection,
    modelName: "Image",
  }
);

export default Image;