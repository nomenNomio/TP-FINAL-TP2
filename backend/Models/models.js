
import connection from "../connection/connection.js";

import Category from "./Category.js";
import Developer from "./Developer.js";
import Publisher from "./Publisher.js";
import Image from "./Image.js";
import Game from "./Game.js";
import Language from "./Language.js";
import Requirements from "./Requirements.js";
import Role from "./Role.js";
import Sale from "./Sale.js";
import Tag from "./Tag.js";
import User from "./User.js";
import UserGame from "./UserGame.js";


//Developer one-to-many Game//

    Developer.hasMany(Game, {
    foreignKey: {
        allowNull: false,
    },
    });
    Game.belongsTo(Developer, {
    foreignKey: {
        allowNull: false,
    },
    });

//---------------------------//

//Game many-to-many Category through GameCategories//

    const GameCategories = connection.define("GameCategories",{})

    Game.belongsToMany(Category, {
      as: 'gameCategories',
      through: GameCategories,
    });
    Category.belongsToMany(Game, {
      as: 'gameCategories',
      through: GameCategories,
    });

//---------------------------//

//Publisher one-to-many Game//

    Publisher.hasMany(Game);
    Game.belongsTo(Publisher);

//---------------------------//

//Game one-to-many Image//

    Game.hasMany(Image, {
      as: 'images',
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
    Image.belongsTo(Game, {
      foreignKey: {
        allowNull: false,
      },
    });

//---------------------------//

//Game one-to-one Image "mainImage" //

    Image.hasOne(Game, {
      foreignKey: "mainImageId",
      constraints: false,
    });
    Game.belongsTo(Image, {
      foreignKey: "mainImageId",
      constraints: false,
    });

//---------------------------//

//Game one-to-many Requirements//

    Game.hasMany(Requirements, {
      as: 'requirements',
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
    Requirements.belongsTo(Game, {
      foreignKey: {
        allowNull: false,
      },
    });

//---------------------------//

//Game many-to-many Requirements through GameLanguages//

    const GameLanguages = connection.define("GameLanguages",{})

    Game.belongsToMany(Language, {
      as: "gameLanguages",
      through: GameLanguages,
    });
    Language.belongsToMany(Game, {
      as: "gameLanguages",
      through: GameLanguages,
    });

//---------------------------//

//Game many-to-many Tag through GameLanguages//

    const GameTags = connection.define("GameTags",{})

    Game.belongsToMany(Tag, {
      as: "gameTags",
      through: GameTags,
    });
    Tag.belongsToMany(Game, { 
      as: "gameTags",
      through: GameTags,
    });

//---------------------------//

//Game many-to-many User through Sale//

    Game.belongsToMany(User, {
      through: Sale,
    });
    User.belongsToMany(Game, {
      through: Sale,
    });

//---------------------------//

//Game many-to-many User through UserGame//

    Game.belongsToMany(User, {
      through: UserGame,
    });
    User.belongsToMany(Game, {
      through: UserGame,
    });

//---------------------------//

//Role one-to-many User//

    Role.hasMany(User, {
      foreignKey: {
        allowNull: false,
      },
    });
    User.belongsTo(Role);

//---------------------------//

export {
  Category,
  Developer,
  Publisher,
  Game,
  Language,
  Requirements,
  Role,
  Sale,
  Tag,
  User,
  UserGame,
  Image,
  GameCategories,
  GameLanguages,
  GameTags,
};
