import { Tag } from "../Models/models.js";

export async function tagSeed() {
  await Tag.bulkCreate([
    { tag: "Roguelike" },
    { tag: "Turn Based" },
    { tag: "Story" },
    { tag: "Multiplayer" },
    { tag: "VR Support" },
    { tag: "Comedy" },
    { tag: "Retro" },
    { tag: "Thought provoking" },
    { tag: "Microtransactions" },
    { tag: "Simulation" },
    { tag: "Indie" },
    { tag: "Artistic" },
    { tag: "War" },
    { tag: "Base Building" },
  ]);
}