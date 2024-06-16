import { Category } from "../Models/models.js";

export async function categoryrSeed() {
  await Category.bulkCreate([
    { category: "Horror" },
    { category: "Action" },
    { category: "RPG" },
    { category: "Tower Defence" },
    { category: "Sandbox" },
    { category: "Casual" },
    { category: "Strategy" },
  ]);
}