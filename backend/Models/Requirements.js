import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Requirements extends Model {}

Requirements.init(
  {
    typeReq: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operativeSistem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    processor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    memory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    graphics: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    storage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "Requirements",
  }
);

export default Requirements;
