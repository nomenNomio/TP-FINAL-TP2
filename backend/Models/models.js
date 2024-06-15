import Category from "./Category.js";
import Developer from "./Developer.js";
import Editor from "./Editor.js";
import Image from "./Image.js";
import Game from "./Game.js";
import Language from "./Language.js";
import Requirements from "./Requirements.js";
import Role from "./Role.js";
import Sale from "./Sale.js";
import Tag from "./Tag.js";
import User from "./User.js";
import UserGame from "./UserGame.js";

Developer.hasMany(
    Game,
    {
        foreignKey: {
            allowNull: false,
        },
    }
);
Game.belongsTo(
    Developer, 
    {
        foreignKey: {
            allowNull: false,
        },
    }
);

Game.belongsToMany(
    Category,
    {
        through: 'GameCategories',
    }
);
Category.belongsToMany(
    Game,
    {
        through: 'GameCategories',
    }
);


Editor.hasMany(Game);
Game.belongsTo(Editor);

Game.hasMany(
    Image,
    {
        onDelete: 'CASCADE',
        foreignKey: {
            allowNull: false,
        },
    }
);
Image.belongsTo(
    Game,
    {
        foreignKey: {
            allowNull: false,
        },
    }
);

Image.hasOne(Game, {
  as: "principalImage",
  foreignKey: "principalImageId",
  constraints: false,
});
Game.belongsTo(Image, {
  as: "principalImage",
  foreignKey: "principalImageId",
  constraints: false,
});

Game.hasMany(
    Requirements,    
    {
        onDelete: 'CASCADE',
        foreignKey: {
            allowNull: false,
        },
    }
);
Requirements.belongsTo(
    Game,
    {
        foreignKey: {
            allowNull: false,
        },
    }
);

Game.belongsToMany(
    Language,
    { through: 'GameLanguages' }
);
Language.belongsToMany(
    Game,
    { through: 'GameLanguages' }
);

Game.belongsToMany(
    Tag,
    { through: 'GameTags' }
);
Tag.belongsToMany(
    Game,
    { through: 'GameTags' }
);


Game.belongsToMany(
    User,
    {   
        through: Sale 
    }
);
User.belongsToMany(
    Game,
    {   
        through: Sale 
    }
);


Role.hasMany(User,
    {
        foreignKey: {
            allowNull: false,
        },
    }
);
User.belongsTo(Role);

Game.belongsToMany(
    User,
    {   
        through: UserGame 
    }
);
User.belongsToMany(
    Game,
    {   
        through: UserGame 
    }
);

export {
    Category,
    Developer,
    Editor,
    Game,
    Language,
    Requirements,
    Role,
    Sale,
    Tag,
    User,
    UserGame,
};