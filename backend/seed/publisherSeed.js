import { Publisher } from "../Models/models.js";

export async function publisherSeed() {
  await Publisher.bulkCreate([
    { publisher: "Devolver Digital" },
    { publisher: "2K Games" },
    { publisher: "Activision" },
    { publisher: "Konami" },
    { publisher: "Bethesda Softworks" },
    { publisher: "Blizzard Entertainment" },
    { publisher: "Capcom" },
    { publisher: "CD Projekt Red" },
    { publisher: "FromSoftware" },
    { publisher: "Take-Two Interactive" },
  ]);
}