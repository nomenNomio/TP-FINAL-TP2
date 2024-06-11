import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class User extends Model {
  comparePass = async (password) => {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
  };
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    role: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

User.beforeCreate(async (user) => {
  const genSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, genSalt);
  user.password = hashedPassword;
});

export default User;