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
  ],
  {individualHooks: true}
  );
}