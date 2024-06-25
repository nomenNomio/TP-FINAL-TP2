import { DataTypes, Model, where } from "sequelize";
import connection from "../connection/connection.js";

import {
  Developer,
  Category,
  GameCategories,
  Requirements,
  Image,
  Publisher,
  Tag,
  GameTags,
  GameLanguages,
  Language,
} from "../Models/models.js";

class Game extends Model {

  //tengo que hacer funciones repetitivas porque pasar tipos bien es un quilombo
  //esto estaria más bien para Typescript
  //puedo hacerlo de todas formas pero para no hacerlo tan engorroso decidí hacer 3 funciones similares y listo

  async bulkCreateGameCategory(categories, { transaction }) {

    //busca una categoria, le saca el id y con eso crea una "GameCategories", lo hace para todas las categorias
    //las otras funciones hacen lo mismo pero con otros tipos (se podrian unificar pero es un dolor de huevos)

    const gameCategories = await Promise.all(
        categories.map(async (category) => {
            const query = { where: { category }, transaction };
            const categoryInstance = await Category.findOne(query);
            if(!categoryInstance) throw new Error("Uno de las categorias enviadas no existe o no fue encontrada.");
            const CategoryId = categoryInstance.id;
            const gameCategory = { GameTitle: this.title, CategoryId };
            return gameCategory;
        })
    );

    return await GameCategories.bulkCreate(gameCategories, {transaction} );
  }

  async bulkCreateGameLanguage(languages, { transaction }) {
    const gameLanguages = await Promise.all(
        languages.map(async (language) => {
            const query = { where: { language }, transaction };
            const languageInstance = await Language.findOne(query);
            if(!languageInstance) throw new Error("Uno de los lenguajes enviados no existe o no fue encontrado.");
            const LanguageId = languageInstance.id;
            const gameLanguage = { GameTitle: this.title, LanguageId };
            return gameLanguage;
      })
    );

    return await GameLanguages.bulkCreate(gameLanguages, {transaction} );
  }

  async bulkCreateGameTag(tags, { transaction }) {
    const gameTags = await Promise.all(
        tags.map(async (tag) => {
            const query = { where: { tag }, transaction };
            const tagInstance = await Tag.findOne(query);
            if(!tagInstance) throw new Error("Uno de los tags enviados no existe o no fue encontrado.");
            const TagId = tagInstance.id;
            const gameTag = { GameTitle: this.title, TagId };
            return gameTag;
      })
    );

    return await GameTags.bulkCreate(gameTags, {transaction} );
  }

  async setMainImage(mainImage, {transaction}){

    const query = {
      where: {
        GameTitle: this.title,
        ...mainImage,
      },
      transaction,
    };

    const mainImageInstance = await Image.findOne(query);
    if(!mainImageInstance) throw new Error("La imagen principal tuvo un error.");
    const mainImageId = mainImageInstance.id;
    this.mainImageId = mainImageId;
    await this.save({ transaction });

  }

  static async create(
    {
      title,
      description,
      price,
      launchDate,
      logo,
      gamePlay,
      rating,
      developer,
      publisher,
      mainImage,
      images,
      categories,
      requirements,
      tags,
      languages,
    },
    { transaction }
  ) {

    images.push(mainImage);

    const developerInstance = await Developer.findOne({ where: { developer }, transaction });
    if(!developerInstance) throw new Error("El desarrollador no existe o no fue encontrado");
    const DeveloperId = developerInstance.id;

    const publisherInstance = await Publisher.findOne({ where: { publisher }, transaction });
    const PublisherId = publisherInstance?.id;

    const game = await super.create(
      {
        title,
        description,
        price,
        launchDate,
        logo,
        gamePlay,
        rating,
        DeveloperId,
        PublisherId,
        images,
        requirements,
      },
      {
        include: [
          {
            model: Image,
            as: "images",
          },
          {
            model: Requirements,
            as: "requirements",
          },
        ],
        transaction,
      }
    );

    await game.bulkCreateGameCategory(categories, {transaction});
    await game.bulkCreateGameLanguage(languages, {transaction});
    await game.bulkCreateGameTag(tags, {transaction});

    await game.setMainImage(mainImage, {transaction});

    return game;
    
  }
}

Game.init(
  {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        isNumeric: true,
        min: 0,
    },
    launchDate: {
        type: DataTypes.DATE,
        allowNull: false,
        isDate: true,   
    },
/*     franchising: {
        type: DataTypes.STRING,
        allowNull: true,
    }, */
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
        isUrl: true, 
    },
    gamePlay: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.DECIMAL(5, 1),
        allowNull: true,
        min: 0,
        max: 10,
    },
  },
  {
    sequelize: connection,
    modelName: "Game",
  }
);


export default Game;