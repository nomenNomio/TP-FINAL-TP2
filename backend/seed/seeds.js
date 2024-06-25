import { categorySeed } from "./categorySeed.js";
import { developerSeed } from "./developerSeed.js";
import { gameSeed } from "./gameSeed.js";
import { languageSeed } from "./languageSeed.js";
import { publisherSeed } from "./publisherSeed.js";
import { roleSeed } from "./roleSeed.js";
import { tagSeed } from "./tagSeed.js";
import { userSeed } from "./userSeed.js";

export async function seeds(){
    await developerSeed();
    await publisherSeed();
    await roleSeed();
    await tagSeed();
    await languageSeed();
    await categorySeed();
    await userSeed();
    await gameSeed();
}