import { User } from "../Models/models.js";

export async function userSeed() {
  await User.bulkCreate([
    {
        name:"admin",
        lastName:"admin",
        userName:"admin",
        email:"admin@gmail.com",
        password:"admin",
        RoleId:1,
    },
    {
      name:"Pepe",
      lastName:"Mujica",
      userName:"El_Oriental",
      email:"elTipoEse@uruguay.gov",
      password:"123456",
      RoleId:3,
  },
  ],
  {individualHooks: true}
  );
}