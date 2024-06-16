import { Role } from "../Models/models.js";

export async function roleSeed() {
  await Role.bulkCreate([
    { role: "ADMIN" },
    { role: "USER" },
  ]);
}