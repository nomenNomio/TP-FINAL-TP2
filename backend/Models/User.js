import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";
import Role from "./Role.js";

class User extends Model {
  async comparePass(password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
  }

  static async create(
    { name, lastName, userName, email, password, role },
    { transaction }
  )
  {

    const user = await super.create(
      {
        name,
        lastName,
        userName,
        email,
        password,
        RoleId: (await Role.findOne({ where: { role }, transaction })).id,
      },
      { transaction }
    );

    return user;

  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 20,
      isAlpha: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 20,
      isAlpha: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      max: 20,
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
      min: 8,
    },
    isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

User.beforeCreate(async (user) => {

  let initials = "";

  if(user.name[0] && user.lastName[0]){
    initials = user.name[0].toUpperCase() + user.lastName[0].toUpperCase();
  }
  
  user.initialsName = initials;
});


export default User;