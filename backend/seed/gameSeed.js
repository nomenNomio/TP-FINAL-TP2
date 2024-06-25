import { Game } from "../Models/models.js";

export async function gameSeed() {
  await Game.create({
    title:"Enter the Gungeon",
    description:"Escapar de una mazmorra",
    price:"10",
    launchDate: "2012-04-23T18:25:43.511Z",
    logo:"https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Enter_the_Gungeon_logo.png/330px-Enter_the_Gungeon_logo.png",
    gamePlay:"Te moves y disparas",
    rating:"8",
    developer:"Dodge Roll",
    publisher:"Devolver Digital",
    mainImage: {
        alt: "prinImg",
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.everyeye.it%2Fimg-articoli%2Fenter-the-gungeon-v5-29194.jpg&f=1&nofb=1&ipt=721ca5eba14c4538f76f9130df4f9230661828061177036b8ed170670f285774&ipo=images"
    },
    images:[],
    categories: [
        "Action"
    ],
    requirements: [
        {
            typeReq: "Suficientes",
            operatingSystem: "Windows 10",
            processor: "intel i3",
            memory: "8GB",
            graphics: "Nvidia 980",
            storage: "320 MB"
        },
    ],
    tags: [
        "Roguelike",
        "Multiplayer",
        "Retro",
        "Indie"
    ],
    languages:[
        "English",
        "Hindi"
    ]
  },
  {transaction:null}
);
}