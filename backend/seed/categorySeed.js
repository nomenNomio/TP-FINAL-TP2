import { Category } from "../Models/models.js";

export async function categorySeed() {
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