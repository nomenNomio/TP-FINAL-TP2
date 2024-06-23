import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Sale extends Model {
  static async create({ GameTitle, UserId, amount }, { transaction }) {

    const query = {
      where: {
        UserId,
        GameTitle,
      },
      transaction,
    };

    let sale = await Sale.findOne(query);

    if (!sale) {
      //si no existe sale (!sale) crea uno nuevo
      const saleAtributes = { GameTitle, UserId, amount, transaction };
      sale = await super.create(saleAtributes);
    } else {
      //si existe añadis la cantidad al total
      sale.amount += amount;
      await sale.save({ transaction });
    }

    return sale;

  }
}

Sale.init(
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 1,
    },
  },
  {
    sequelize: connection,
    modelName: "Sale",
  }
);

export default Sale;
