import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class Sale extends Model {}

Sale.init(
  {
    amount: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "Sale",
  }
);

export default Sale;