import { categoryrSeed } from "./categorySeed.js";
import { developerSeed } from "./developerSeed.js";
import { languageSeed } from "./languageSeed.js";
import { publisherSeed } from "./publisherSeed.js";
import { roleSeed } from "./roleSeed.js";
import { tagSeed } from "./tagSeed.js";

export async function seeds(){
    await developerSeed();
    await publisherSeed();
    await roleSeed();
    await tagSeed();
    await languageSeed();
    await categoryrSeed();
}