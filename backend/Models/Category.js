import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Category extends Model {}

Category.init(
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isAlpha:true,
      max:20,
    },
  },
  {
    sequelize: connection,
    modelName: "Category",
  }
);

export default Category;