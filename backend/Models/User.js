import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";
import {Role} from "./models.js";

class User extends Model {
  async comparePass(password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
  }

  static async login({ email, password }) {

    const query = {
      where: {
        email,
      },
    };

    const user = await User.findOne(query);
    if (!user) throw new Error("Usuario no encontrado.");

    //se fija si la contraseña es correcta
    const comparePass = await user.comparePass(password);
    if (!comparePass) throw new Error("El usuario o la contraseña son incorrectos.");

    return user;
  }

  static async create(
    { name, lastName, userName, email, password, role },
    { transaction }
  ) {
    const roleInstance = await Role.findOne({ where: { role }, transaction });
    if (!roleInstance) throw new Error("El rol enviado no se econtro");
    const RoleId = roleInstance.id;

    const user = await super.create(
      {
        name,
        lastName,
        userName,
        email,
        password,
        RoleId,
      },
      { transaction }
    );

    return user;
  }

  static async update(
    { id, name, lastName, userName, email, password },
    { transaction }
  ) {
    const user = await User.findByPk(id, { transaction });
    if (user) {
      if (name) user.name = name;
      if (lastName) user.lastName = lastName;
      if (userName) user.userName = userName;
      if (email) user.email = email;
      if (password) user.password = password;

      const result = await user.save({ transaction });
    } else {
      throw new Error("Usuario no encontrado");
    }
  }

  static async isAdminByPk(PK) {
    const { dataValues: user } = await User.findByPk(PK);
    const { dataValues: roleTable } = await Role.findByPk(user.RoleId);
    return roleTable.role == "ADMIN";
  }
}

//init

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
    initialsName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NN",
  },
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

//funciones

async function hashPassword(user){
  const genSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, genSalt);
  user.password = hashedPassword;
}

async function setInitials(user){
  try{
    let initials = "";

    if(user.name[0] && user.lastName[0]){
      initials = user.name[0].toUpperCase() + user.lastName[0].toUpperCase();
    }
    
    user.initialsName = initials;
  }catch{};
}

//hooks

//beforeCreate
User.beforeCreate(async (user) => {
  await hashPassword(user);
  await setInitials(user);
});


//beforeUpdate
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    await hashPassword(user);
  }
  await setInitials(user);
});

export default User;