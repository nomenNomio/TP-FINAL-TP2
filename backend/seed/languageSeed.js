import { Language } from "../Models/models.js";

export async function languageSeed() {
  await Language.bulkCreate([
    { language: "English" },
    { language: "Spanish" },
    { language: "French" },
    { language: "Italian" },
    { language: "Chinese" },
    { language: "Portuguese" },
    { language: "Arabic" },
    { language: "Persian" },
    { language: "Russian" },
    { language: "Hebrew" },
    { language: "Japanese" },
    { language: "German" },
    { language: "Hindi" },
  ]);
}