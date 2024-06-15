import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Sale extends Model {}

Sale.init(
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min:1,
    },
  },
  {
    sequelize: connection,
    modelName: "Sale",
  }
);

export default Sale;