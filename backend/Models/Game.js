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

    static async create({
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
        {transaction}
    )
    {

        images.push(mainImage);

        const developerInstance = await Developer.findOne({ where: { developer }, transaction });
        const publisherInstance = await Publisher.findOne({ where: { publisher }, transaction });

        const game = await super.create(
            {
                title,
                description,
                price,
                launchDate,
                logo,
                gamePlay,
                rating,
                DeveloperId: developerInstance.id,
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

        for (let category of categories) {
            const categoryInstance = await Category.findOne({ where: { category }, transaction });
            await GameCategories.create({ GameTitle: game.title, CategoryId: categoryInstance.id }, { transaction });
        }

        for (let language of languages) {
            const languageInstance = await Language.findOne({ where: { language }, transaction });
            await GameLanguages.create({ GameTitle: game.title, LanguageId: languageInstance.id }, { transaction });
        }

        for (let tag of tags) {
            const tagInstance = await Tag.findOne({ where: { tag }, transaction });
            await GameTags.create({ GameTitle: game.title, TagId: tagInstance.id }, { transaction });
        }

        game.publisherId = publisherInstance?.id;
        const mainImageInstance = await Image.findOne({
            where: { ...mainImage, GameTitle: game.title },
            transaction,
        });
        game.mainImageId = mainImageInstance.id;
        await game.save({ transaction });

        return game;
        //terminar de refactorizar
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