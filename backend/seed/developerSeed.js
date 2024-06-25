import { Developer } from "../Models/models.js";

export async function developerSeed() {
  await Developer.bulkCreate([
    { developer: "Super Gigant Games" },
    { developer: "EA" },
    { developer: "Ubisoft" },
    { developer: "Bethesda" },
    { developer: "Mojang" },
    { developer: "Respawn Entertainment" },
    { developer: "Dodge Roll" },
  ]);
}